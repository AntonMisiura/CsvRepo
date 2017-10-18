import * as Cookies from "js-cookie";
import Facebook from './facebook';
import Google from './google';
import Login from './login'
import Registration from './registration'
import RestorePassword from './restorePassword'
import { SettingsManager } from './settingsManager';
import { Settings } from './settingsManager';
import Helpers from './helpers'
import { widgetStyles } from './styles'
class Widget {
    constructor() {
        this.userSession = this.getCookies();
        this.widgetUI = new WidgetUI();
        this.widgetUI.applyStyles(widgetStyles);

        this.cookieStatuses = {
            renew: 0,
            ok: 1
        }
        SettingsManager.connection('/widget-settings.json');
        SettingsManager.ipReader();
        let login = new Login();
        let reg = new Registration();
        this.fb = new Facebook();
        this.g = new Google();
        this.restorePassword = new RestorePassword();
        this.signOut = this.signOut.bind(this);
        this.main();
    }

    signOut() {
        console.log("SignOut")
        Helpers.cookieRemover();
        var prom = new Promise((resolve, reject) => {
            console.log(this)
            this.fb.isSignedIn().then((res) => {
                if (res) {

                    this.fb.signOut();
                    resolve(true);
                }
            });
            if (this.g.isSignedIn()) {
                this.g.signOut();
                resolve(true);
            }
            resolve(true)
        });
        prom.then((res) => {
            if (res) {
                window.location = Settings["SignOutRedirect"];;
            }
        })

    }
    getCookies() {
        return Cookies.getJSON('USER_SESSION');
    }
    cookieStatus() {
        var lifeTime = this.userSession.expirationDate - this.userSession.startDate;
        var difference = Date.now() - this.userSession.startDate;
        if (difference > (lifeTime / 3) * 2) {
            return this.cookieStatuses.renew;
        }
        return this.cookieStatuses.ok;
    }
    main() {
        if (this.userSession) {
            let status = this.cookieStatus();
            if (status === this.cookieStatuses.ok) {
                this.widgetUI.cleanWidget();
                this.widgetUI.renderGreetings(this.userSession.userName !== undefined ? this.userSession.userName : "User");
                this.widgetUI.renderSignoutButton({ "click": this.signOut });
            }
            else if (status === this.cookieStatuses.renew) {

                this.g.connect(() => {
                    if (this.g.isSignedIn()) {
                        this.g.refreshToken();
                    }
                });
                this.fb.init(Settings["FacebookApp"]).then((res) => {
                    this.fb.isSignedIn().then((res) => {
                        if (res) {

                            this.fb.login();
                        }
                    });
                });

            }
        }
        else {
            this.widgetUI.cleanWidget().renderLoginLink().renderRegisterLink();
        }


    }
}

class WidgetUI {
    constructor() {

        this.widgetContainer = document.getElementById("auth-widget");
        this.loginLink = {
            tagName: 'a',
            innerText: "login",
            href: "login.html",
            className: "login-reg-link"
        };
        this.registerLink = {
            tagName: 'a',
            innerText: "registration",
            href: "registration.html",
            className: "login-reg-link reg"
        };
        this.signOutButton = {
            tagName: "button",
            className: "login-reg-link reg",
            type: "button",
            innerText: "Sign Out"
        };
        this.greeting = {
            tagName: "span",
            innerText: "Hello, "
        }


    }

    renderLoginLink(events) {
        console.log("rendering login link")
        this.renderWidgetElement(this.loginLink, events);
        return this;
    }
    renderRegisterLink(events) {
        console.log("rendering register link")
        this.renderWidgetElement(this.registerLink, events);
    }
    renderSignoutButton(events) {
        this.renderWidgetElement(this.signOutButton, events);
    }
    renderGreetings(userName) {
        this.greeting.innerText += userName;
        this.renderWidgetElement(this.greeting);
    }
    cleanWidget() {
        console.log("cleaning")
        this.widgetContainer.innerHTML = "";
        return this;
    }
    applyStyles(styles) {
        var widgetStyles = document.createElement('style');
        widgetStyles.innerHTML = styles;
        document.head.appendChild(widgetStyles);
    }

    renderWidgetElement(elementDescription, events) {
        Helpers.renderElement(elementDescription, this.widgetContainer, events);


    }
}
export default Widget;







