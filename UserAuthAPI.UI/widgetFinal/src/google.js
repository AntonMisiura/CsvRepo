import { ExternalUser } from './models/externalUser'
import { actionTypes } from './actionTypes'
import Helpers from './helpers'
import {Settings} from './settingsManager';
import Http from './http'

export default class Google {
    constructor() {
        
       this.login = this.login.bind(this)
        this.isSignedIn = this.isSignedIn.bind(this);
        this.initG = this.initG.bind(this);
        this.loginSteps = this.loginSteps.bind(this);
        this.refresher = this.refresher.bind(this);
        this.googleUI = new GoogleUI(this.login);
        
        this.connect(this.initG)
        
        
    }
    loadGoogleScript(file) {
        var jsElm = document.createElement("script");
        jsElm.type = "application/javascript";
        jsElm.src = file;
        document.head.appendChild(jsElm);
}


    connect(connectCallBack) {
        gapi.load('auth2', connectCallBack);
    }
    initG() {
        gapi.auth2.init(Settings["GoogleApp"])

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
            scope: Settings["GoogleScope"].join(' ')
        }).then((res) => {
            that.getUserData(res);
        })
    }
    isSignedIn() {
       return gapi.auth2.getAuthInstance().isSignedIn.get();
    }
    
    signOut() {

        gapi.auth2.getAuthInstance().signOut();
    }
    getUserData(googleUser) {
        if (googleUser.El != null) {

            let profile = googleUser.getBasicProfile();
            let authResp = googleUser.getAuthResponse();
            let startDate = Helpers.GetUTCMilliseconds();
            let expiresIn = authResp.expires_in;
            
           
            let endDate = startDate + expiresIn * 1000;
            let gu = new ExternalUser(profile.getId(), profile.getName(), profile.getEmail(), authResp.id_token, startDate, endDate, actionTypes.google);
            var redirectUrl = Helpers.getRedirectUrl();
         let dataString = Helpers.userDataStringFormer(actionTypes.google, gu);
           
            Http.post(Settings["APIHost"] + '/login',
                dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                    if(res){
                        Helpers.cookiesSetter(startDate, endDate, gu.userName, "123", redirectUrl, res.jwtToken);
                          console.log(res)
                        window.location = redirectUrl;
                    }
                
              
             }).catch((e) => {
                 console.error(e)
             });
        
        }
    }

}

class GoogleUI{
    constructor(clickHandler){
        this.googleButtonTag = `<button type="button" id="g" class="google-button">
        <span class="g-logo">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="g-svg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
            </path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
        </span>
        Sign In with Google</button>`;
        this.googleButton = "";
        let loginContainer = document.getElementById("login");
        if (loginContainer) {
            this.renderButton(loginContainer, clickHandler)
        }
        else {
            let regContainer = document.getElementById("registration");
            if (regContainer) {
                this.renderButton(regContainer, clickHandler)
            }
        }
    }
    renderButton(parentElement, clickHandler) {
        let socialButtonsContainer = document.createElement("div");
        socialButtonsContainer.innerHTML = this.googleButtonTag;
        parentElement.appendChild(socialButtonsContainer);
       this.googleButton = document.getElementById("g");
        this.googleButton.addEventListener("click", clickHandler)
        console.log(this.googleButton);

    }
}