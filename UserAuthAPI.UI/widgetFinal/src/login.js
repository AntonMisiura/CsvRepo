import Helpers from './helpers'
import {actionTypes} from './actionTypes'
import Http from './http'
import {Settings} from './settingsManager';
export default class Login{
    constructor(){
        this.loginUI = new LoginUI();
        if(this.loginUI.loginFormContainer){
             this.loginUI.renderLoginForm(this.submit, this.forgotPasswordFormSubmit);
        }
       
     
    }
     forgotPasswordFormSubmit(e) {
         e.preventDefault();
     
        let email = this.elements.emailForgot.value;
        Http.post(Settings["APIHost"]+'/sendEmail',
            "email="+email, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                console.warn(res)
            }).catch((e) => {
                console.warn(e)
            })
    }
     
    submit(e){
         e.preventDefault();
        var form = document.getElementById("loginForm");
        if (Helpers.emailValidator(null, form.elements.email) & Helpers.passwordValidator(null, form.elements.password)) {
            
            let startDate = Helpers.GetUTCMilliseconds();
           
            let objToSend = {
                email: form.elements.email.value,
                password: form.elements.password.value,
                startDate: startDate
            }

           
           
            
            let dataString = Helpers.userDataStringFormer(actionTypes.login, objToSend);
            let redirectUrl = Helpers.getRedirectUrl();
            Http.post(Settings["APIHost"] + '/login',
                    dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                         
                        Helpers.cookiesSetter(startDate, startDate + res.expires_in*1000,
                            res.userName === undefined ? "User" : res.userName, "123", redirectUrl, res.jwtToken);
                       window.location = redirectUrl;
                    }).catch((e) => {
                        let errorContainer = document.getElementById('server-error');
                        errorContainer.innerText = e;
                })

        } else return;
    }
}
class LoginUI{
    constructor(){
        this.loginFormContainer = document.getElementById("login");
        
        this.loginFormFields = [{
            tagName: 'input',
            type: 'email',
            name: 'email',
            placeholder: "you@example.org",
            className: "login-reg-input"
        },
        {
            tagName: 'input',
            type: 'password',
            name: 'password',
            placeholder: "************",
            className: "login-reg-input"
        },
        {
            tagName: 'div',
            id: 'toggleForgot',
            className: "forgot-password-link",
            innerText: "Forgot password?",
        },
        {
            tagName: 'button',
            type: 'submit',
            innerText: "Login",
            className: "login-reg-button"
        }];
        this.forgotForm = {
            className: 'hidden',
            id: 'forgotForm',
            name: 'forgotPasswordForm'
        };
        this.forgotFormFields = [{
            tagName: 'input',
            type: 'email',
            placeholder: 'Enter email',
            className: 'login-reg-input',
            name: 'emailForgot'
        }, {
            tagName: 'button',
            type: 'submit',
            id: 'forgotPasswordSubmit',
            innerText: 'Restore password',
            className: 'login-reg-button'
        }];

        
    }
    toggleForgotForm() {
        let forgotPasswordBlock = document.getElementById("forgotForm");
        if (forgotPasswordBlock.classList.contains("hidden")) {
            forgotPasswordBlock.classList.remove("hidden");
        } else {
            forgotPasswordBlock.classList.add("hidden");
        }
    }
    renderForgotForm(parent, submitForm) {

        let forgotPasswordForm = document.createElement("form");
        forgotPasswordForm.name = "forgotPassword";
        for (let key in this.forgotForm) {
            forgotPasswordForm[key] = this.forgotForm[key];
        }
        let newThis = this;
        this.forgotFormFields.forEach((item, i, arr) => {
            let element = document.createElement(item.tagName);
            for (let key in item) {
                if (key != 'tagName') {
                    element[key] = item[key];
                }
            }
            forgotPasswordForm.appendChild(element);
        })
        forgotPasswordForm.addEventListener('submit', submitForm);
        parent.appendChild(forgotPasswordForm);

    }
    renderLoginForm(loginSubmit, forgotPasswordSubmit){
        let form = document.createElement('form');
        form.name = "loginForm";
        form.id = "loginForm"
        form.addEventListener('submit', loginSubmit);

        let newThis = this;
        this.loginFormFields.forEach((item)=> {
            let events = {};
            if(item.type == "password"){
                events = {
                    "blur": Helpers.passwordValidator,
                    "focus": Helpers.removeError
                }
            }
            if(item.type == "email"){
                events = {
                    "blur": Helpers.emailValidator,
                    "focus": Helpers.removeError
                }
            }
            if(item.id == "toggleForgot"){
                events = {
                    "click": this.toggleForgotForm
                }
            }
            Helpers.renderElement(item, form, events);   
        });
        let serverError = document.createElement("div");
            serverError.className = 'form-error';
            serverError.id = 'server-error';
            form.appendChild(serverError);
        this.loginFormContainer.appendChild(form);
         this.renderForgotForm(this.loginFormContainer, forgotPasswordSubmit);
    }
}