import * as Cookies from "js-cookie";
import Login from './login'
import Http from './http'
import { widgetStyles } from './styles'
import FacebookLogin from './facebook'
import GoogleLogin from './google'
import Registration from './registration'
import Helpers from './helpers'
import {SettingsManager} from './settingsHolder'

class LoginWidget {
    parseIpJson(json) {
        JSON.parse(json, null, 2);
    }
    constructor() {
        /*Http.get('http://ip-api.com/json?callback=?', , , this.parseIpJson).then((res)=>{
            console.log(res);
        })*/
        this.userSession = this.getCookies();
        this.signOut = this.signOut.bind(this);

        this.loginRegisterButtons = [{
            tagName: 'a',
            innerText: "registration",
            href: "registration.html",
            class: "login-reg-link reg"
        },
        {
            tagName: 'a',
            innerText: "login",
            href: "login.html",
            class: "login-reg-link"
        },
        ]
        
    
        this.fb = new FacebookLogin(settings);
            this.g = new GoogleLogin(settings);
            this.login = new Login(settings);
            this.registration = new Registration(settings);
        
       


       
        this.styles = widgetStyles;

        this.applyStyles(this.styles);

        
        
        this.component();

    }

    applyStyles(styles) {
        var widgetStyles = document.createElement('style');
        widgetStyles.innerHTML = styles;
        document.head.appendChild(widgetStyles);
    }

    settingsFetcher(settings){
        console.log(settings["GoogleApp"])
    }
    getCookies() {
        return Cookies.getJSON('USER_SESSION');
    }
    cookieStatus() {
        var lifeTime = this.userSession.expirationDate - this.userSession.startDate;
        var difference = Date.now() - this.userSession.startDate;


        if (difference > (lifeTime / 3) * 2) {
            return 'renew';
        }
        return 'ok';
    }
    signOut() {

        Helpers.cookieRemover();
        var prom = new Promise((resolve, reject) => {
            console.log("hello")
            this.fb.isSignedIn().then((res) => {
                 console.log(res)
            if (res) {
                console.log("Logginout")
                this.fb.signOut();
                resolve(1);
            }
        });
            if (this.g.isSignedIn()) {
                this.g.signOut();
                resolve(1);
            }
            resolve(1)
        });
        prom.then((res)=>{
            if(res){
                 window.location = "/dist/index.html";
            }
        })
       


    }

    component() {
        var element = document.getElementById('login-widget');


        if (this.userSession) {

            var status = this.cookieStatus();
            if (status === 'renew') {
                element.innerHTML = "Needs to be renewed";
                if (this.g.isSignedIn()) {
                    this.g.refreshToken();
                }


            } else {
                element.innerHTML = "Hello " + this.userSession.userName;
                var signOutButton = document.createElement("button");
                signOutButton.className = "login-reg-link reg";
                signOutButton.type = "button";
                signOutButton.innerText = "Sign Out"
                signOutButton.addEventListener('click', this.signOut);
                element.appendChild(signOutButton)
            }


        } else {

            this.loginRegisterButtons.forEach(function (item, i, arr) {
                var link = document.createElement(item.tagName);
                link.innerText = item.innerText;
                link.href = item.href;
                link.className = item.class;
                element.appendChild(link)
            });
        }



    }
}

let lw = new LoginWidget();
