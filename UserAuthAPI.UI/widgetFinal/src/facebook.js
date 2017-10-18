import {ExternalUser} from './models/externalUser'
import Http from './http'
import Helpers from './helpers'
import { actionTypes } from './actionTypes'
import {Settings} from './settingsManager';
export default class Facebook {
    constructor() {
        this.login = this.login.bind(this)
        let fbUI = new FacebookUI(this.login);
        
        let that = this;
        this.init(Settings["FacebookApp"]);

    }
 init(params) {
        try {
            return Promise.resolve(FB.init(params));
        } catch (e) {
            return Promise.reject(e);
        }
    }
    login() {
        let that = this;
        console.log(that)
        FB.login((response) => {
            if (response.authResponse) {
                that.statusChangeCallback(response, true)
            }
        }, { scope: Settings["FacebookScope"].join(',') });

    }
    statusChangeCallback(response) {
        if (response.status === 'connected') {
            this.fetchUserInfo(Settings["FacebookFields"].join(',')).then((_userData) => {
                var obj = { authRes: response, userData: _userData }
                console.log(obj)
                this.sendUserData(obj);
            });

        };
    }
    fetchUserInfo(fields) {
        return this.api('/me', { 'fields': fields });
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
    sendUserData(loginData) {
        console.warn(loginData)
        if (loginData.userData != undefined) {

            var startDate = Helpers.GetUTCMilliseconds();
            var expiresIn = loginData.authRes.authResponse.expiresIn;
            var endDate = startDate + expiresIn * 1000;


            let fbUser = new ExternalUser(loginData.userData.id, loginData.userData.name,
                loginData.userData.email, loginData.authRes.authResponse.accessToken, startDate, endDate, actionTypes.facebook);

            

            var dataString = Helpers.userDataStringFormer(actionTypes.facebook, fbUser);
        
                       Http.post(Settings["APIHost"] + '/login',
                            dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                            var redirectUrl = Helpers.getRedirectUrl();
                            Helpers.cookiesSetter(startDate, endDate,  
                            loginData.userData.name, res.userID, redirectUrl, res.jwtToken);
                            
                            window.location = redirectUrl;
                        }).catch((e) => {
                            console.warn(e)
                        });
        }
    }

}

class FacebookUI {
    constructor(clickHandler) {
        this.facebookButtonTag = `<button type="button" id="fb" class="facebook-button">
        <span class="fb-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" class="fb-svg" color="#ffffff"><path fill="#ffffff" d="
          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>
          <!--img class="_5h0l img" src="https://www.facebook.com/rsrc.php/v3/y8/r/bDryHPcaXAf.png" alt="app-facebook" width="24" height="24"--></span>
        Sign In with Facebook
        </button>`;
        this.facebookButton = "";
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
        socialButtonsContainer.innerHTML = this.facebookButtonTag;
        parentElement.appendChild(socialButtonsContainer);
        this.facebookButton = document.getElementById("fb");
        this.facebookButton.addEventListener("click", clickHandler)

    }
}