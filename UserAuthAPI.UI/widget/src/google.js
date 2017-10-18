import { ExternalUser } from './models'
import { actionTypes } from './actiontypes'
import Helpers from './helpers'
import Http from './http'
var Host = "";
export default class GoogleLogin {
    constructor(settings) {

        this.login = this.login.bind(this)
        this.isSignedIn = this.isSignedIn.bind(this);
        this.initG = this.initG.bind(this);
        this.loginSteps = this.loginSteps.bind(this);
        this.refresher = this.refresher.bind(this)
       
       /*this.appSettings = {
            client_id: '27904284775-2fgvom9li6v7uv8b8cjvv1iktsaokbf1.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile email',
            ux_mode: 'popup',
            redirect_uri: 'http://localhost:4200'
        }*/
        this.appSettings = settings["GoogleApp"];
        Host = settings["Host"];
        this.connect(this.initG);

        this.button = document.getElementById('g');
        if (this.button) {
            this.button.addEventListener('click', this.login)
        }
    }

    connect(connectCallBack) {
        gapi.load('auth2', connectCallBack);
    }
    initG() {
        gapi.auth2.init(this.appSettings)

    }
    fetchUser() {
        if (this.googleAuth && this.googleAuth.currentUser) {
            this.getUserData(this.googleAuth.currentUser.get())
        }
    }
    login() {
        if (gapi.auth2 === undefined) {
            this.connect(this.loginSteps);

        } else {
            this.loginSteps();
        }

    }
    refreshToken() {
        if (gapi.auth2 === undefined) {
            this.connect(this.refresher);
        } else {
            this.refresher();
        }
    }
    refresher() {
        var authInstance = gapi.auth2.getAuthInstance();
        var googleUser = authInstance.currentUser.get();

        googleUser.reloadAuthResponse().then((info) => {

            this.getUserData(googleUser);
        })
    }
    loginSteps() {
        var that = this;
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn({
            scope: 'profile email'
        }).then((res) => {
            that.getUserData(res);
        })
    }
    isSignedIn() {
      return  gapi.auth2.getAuthInstance().isSignedIn.get();
    }
    signOut() {

        gapi.auth2.getAuthInstance().signOut().then(function(user) {
            console.log('User signed out.');

        });
    }
    getUserData(googleUser) {
        if (googleUser.El != null) {

            let profile = googleUser.getBasicProfile();
            let authResp = googleUser.getAuthResponse();
            let startDate = Date.UTC();
            let expiresIn = authResp.expires_in;
            var endDate = startDate + 36 * 1000;
            //let endDate = startDate + expiresIn * 1000;
            let gu = new ExternalUser(profile.getId(), profile.getName(), profile.getEmail(), authResp.id_token, startDate, endDate, actionTypes.google);

            
            let dataString = Helpers.userDataStringFormer(actionTypes.google, gu);
            var redirectUrl = Helpers.getRedirectUrl();
                Helpers.cookiesSetter(startDate, endDate, gu.userName, "userID", redirectUrl, "token");
                //window.location = redirectUrl;
                
            console.log(dataString)
            Http.post(Host + '/login',
                dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                    if(res){
                        var redirectUrl = Helpers.getRedirectUrl();
                        Helpers.cookiesSetter(startDate, endDate, gu.userName, "123", redirectUrl, res.jwtToken);
                        //window.location = redirectUrl;
                    }
                
              
             }).catch((e) => {
                 console.error(e)
             });

        }
    }

}