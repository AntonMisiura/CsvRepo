import Http from './http'
import { actionTypes } from './actiontypes'
import Helpers from './helpers'

export default class Login {

    constructor(settings) {
        this.socialButtons = `<button type="button" id="g" class="google-button">
        <span class="g-logo">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="g-svg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">
            </path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>
        </span>
        
        Sign In with Google</button>
        <button type="button" id="fb" class="facebook-button">
        <span class="fb-logo">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" class="fb-svg" color="#ffffff"><path fill="#ffffff" d="
          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9
          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1
          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2
          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3
          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>
          <!--img class="_5h0l img" src="https://www.facebook.com/rsrc.php/v3/y8/r/bDryHPcaXAf.png" alt="app-facebook" width="24" height="24"--></span>
        Sign In with Facebook
        </button>`
        this.loginFields = [{
            tagName: 'input',
            type: 'email',
            name: 'email',
            placeholder: "you@example.org",
            className: "login-reg-input"
        },

        {
            tagName: 'input',
            type: 'text',
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
        }]

        this.forgotForm = {
            className: 'hidden',
            id: 'forgotForm',
            name: 'forgotPasswordForm'
        };
        this.forgotFormFields = [{
            tagName: 'input',
            type: 'text',
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
        this.renderLoginForm();
    }

    submit(e) {
        e.preventDefault();
        if (Helpers.emailValidator(null, this.elements.email) & Helpers.passwordValidator(null, this.elements.password)) {

            let startDate = Date.UTC();
            let endDate = startDate + 36 * 1000;

            let objToSend = {
                email: this.elements.email.value,
                password: this.elements.password.value,
                startDate: startDate
            }
            let dataString = Helpers.userDataStringFormer(actionTypes.login, objToSend);
            let redirectUrl = Helpers.getRedirectUrl();
           /* Http.post(settings["Host"] + '/login',
                dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {

                    Helpers.cookiesSetter(startDate, startDate + res.expires_in,
                        res.userName === undefined ? "User" : res.userName, "123", redirectUrl, res.jwtToken);
                    window.location = redirectUrl;
                }).catch((e) => {
                    let errorContainer = document.getElementById('server-error');
                    errorContainer.innerText = e.message;
                })*/

        } else return;
    }

    addForgotForm(parent) {

        let forgotPasswordForm = document.createElement("form");
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
        forgotPasswordForm.addEventListener('submit', newThis.forgotPassword);
        parent.appendChild(forgotPasswordForm);

    }
    forgotPassword(e) {
        let email = this.elements.emailForgot.value;
        Http.post('http://localhost:11286/restore',
            email, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                console.warn(res)
            }).catch((e) => {
                console.warn(e)
            })
    }
    toggleForgotForm() {
        let forgotPasswordBlock = document.getElementById("forgotForm");
        if (forgotPasswordBlock.classList.contains("hidden")) {
            forgotPasswordBlock.classList.remove("hidden");
        } else {
            forgotPasswordBlock.classList.add("hidden");
        }
    }
    renderSocialButtons(parentElement) {
        let socialButtonsContainer = document.createElement("div");
        socialButtonsContainer.innerHTML = this.socialButtons;
        parentElement.appendChild(socialButtonsContainer);
    }
    renderLoginForm() {
        let loginContainer = document.getElementById('login');

        if (loginContainer) {
            this.renderSocialButtons(loginContainer);
            let serverError = document.createElement("div");

            let form = document.createElement('form');
            form.name = "loginForm";
            let newThis = this;
            this.loginFields.forEach(function (item, i, arr) {
                let element = document.createElement(item.tagName);
                for (let key in item) {
                    if (key != 'tagName') {
                        element[key] = item[key];
                    }
                    if (element.name === 'email') {
                        element.addEventListener("blur", Helpers.emailValidator);
                        element.addEventListener("focus", Helpers.removeError);
                    }
                    if (element.name === 'password') {
                        element.addEventListener("blur", Helpers.passwordValidator);
                        element.addEventListener("focus", Helpers.removeError);
                    }
                    if (element.id === 'toggleForgot') {
                        element.addEventListener("click", newThis.toggleForgotForm);
                    }

                }
                form.appendChild(element);
            });

            if (document.addEventListener) {
                form.addEventListener("submit", this.submit);
            } else if (document.attachEvent) {
                form.attachEvent("onsubmit", this.submit);
            }
            loginContainer.appendChild(form);

            this.addForgotForm(loginContainer);


            serverError.className = 'form-error';
            serverError.id = 'server-error';
            form.appendChild(serverError);
        } else return;
    }


}