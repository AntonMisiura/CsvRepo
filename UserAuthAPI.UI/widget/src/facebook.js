import { ExternalUser } from './models'
import { actionTypes } from './actiontypes'
import Helpers from './helpers'
import Http from './http'

export default class FacebookLogin {
    constructor(settings) {
        this.scope = ['public_profile', 'email'].join(',');
        this.fields = ['name', 'email'].join(',');

        this.appSettings = settings["FacebookApp"];
        this.host = settings["APIHost"];
        
        this.isLoggined = false;
        this.init(this.appSettings);
        this.button = document.getElementById('fb');
        this.login = this.login.bind(this)
        this.getLoginStatus = this.getLoginStatus.bind(this)
        if (this.button) {
            this.button.addEventListener('click', this.login)
        }


    }
    init(params) {
        try {
            return Promise.resolve(FB.init(params));
        } catch (e) {
            return Promise.reject(e);
        }
    }
    getLoginStatus() {
        var that = this;
        FB.getLoginStatus(function(response) {
            that.statusChangeCallback(response);
        });
    }
    

    isSignedIn() {
     
        return new Promise((resolve, reject) => {
            FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    resolve(true)
                } else {
                    resolve(false)
                }
            });
        })
    }
    statusChangeCallback(response) {
        if (response.status === 'connected') {
            this.fetchUserInfo(this.fields).then((_userData) => {
                var obj = { authRes: response, userData: _userData }
                this.sendUserData(obj);
            });

        };
    }

    login() {
        let that = this;

        FB.login((response) => {

            if (response.authResponse) {
                that.statusChangeCallback(response, true)
            }
        }, { scope: that.scope });

    }
    signOut() {
        FB.logout((response) => {
            console.log(response);
        });
    }
    lg(cb){
        FB.getLoginStatus((response) => {
                if (response.status === 'connected') {
                    FB.logout((response) => {
                    
        });
        } 
        });
    }
    fetchUserInfo(fields) {
        return this.api('/me', { 'fields': this.fields });
    }
    api(url, params) {
        return new Promise((resolve, reject) => {
            try {
                FB.api(url, params, (response) => {
                    resolve(response)
                })
            } catch (e) {
                reject(e);
            }
        })
    }
    sendUserData(loginData) {
        console.warn(loginData)
        if (loginData.userData != undefined) {

            var startDate = Date.UTC();
            var expiresIn = loginData.authRes.authResponse.expiresIn;
            //var endDate = startDate + expiresIn * 1000;
            var endDate = startDate + 36 * 1000;
//loginData.userData.name
            let fbUser = new ExternalUser(loginData.userData.id, loginData.userData.name,
                loginData.userData.email, loginData.authRes.authResponse.accessToken, startDate, endDate, actionTypes.facebook);

            var redirectUrl = Helpers.getRedirectUrl();
            Helpers.cookiesSetter(startDate, endDate, fbUser.userName, "userID", redirectUrl, "token");
           /* window.location = redirectUrl;
            */
            
            var dataString = Helpers.userDataStringFormer(actionTypes.facebook, fbUser);
            /*
                       Http.post(settings + '/login',
                            dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                            var redirectUrl = Helpers.getRedirectUrl();
                            Helpers.cookiesSetter(startDate, endDate,  
                            loginData.userData.name, res.userID, redirectUrl, res.jwtToken);
                            //window.location = redirectUrl;
                        }).catch((e) => {
                            console.warn(e)
                        });*/
        }
    }
}