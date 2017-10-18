import Helpers from './helpers'
import {actionTypes} from './actionTypes'
import Http from './http'
import {Settings, IP} from './settingsManager';


export default class Registration{
    constructor(){
        this.loginUI = new RegistrationUI();
        console.log(this.loginUI)
        if(this.loginUI.loginFormContainer){
             this.loginUI.renderRegForm(this.submit);
        }
       
       
    }
      submit(e) {
        e.preventDefault();
        if (Helpers.emailValidator(null, this.elements.email) &
            Helpers.passwordValidator(null, this.elements.password) &

            Helpers.isNotEmpty(this.elements.name.value)) {
            let userName = this.elements.name.value;
            let [firstName, lastName] = userName.split(' ');
            let objToSend = {
                email: this.elements.email.value,
                password: this.elements.password.value,
                userName: userName,
                firstName: firstName,
                lastName: lastName,
                registrationIP: IP
            }
            let dataString = Helpers.userDataStringFormer(actionTypes.register, objToSend);
            console.log(objToSend)
            
            Http.post(Settings["APIHost"] + '/register',
                  dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                  
                 window.location = Settings["RegistrationRedirect"]
              }).catch((e) => {
                  var errorContainer =  document.getElementById('server-error');
                    errorContainer.innerText = e;
              })
        } else return;
        }
}

class RegistrationUI{
   
    constructor(){
         this.loginFormContainer = document.getElementById("registration");
        this.regFormFields = [{
            tagName: 'input',
            type: 'text',
            name: 'name',
            placeholder: "John Doe",
            className: "login-reg-input"
        },
        {
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
            tagName: 'button',
            type: 'submit',
            innerText: "Registration",
            className: "login-reg-button"
        },
        ]
    }
    renderRegForm(regSubmit){
        let form = document.createElement('form');
        form.name = "regForm";
        form.addEventListener('submit', regSubmit);

        let newThis = this;
        this.regFormFields.forEach((item)=> {
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
            Helpers.renderElement(item, form, events);   
        });
        let serverError = document.createElement("div");
            serverError.className = 'form-error';
            serverError.id = 'server-error';
            form.appendChild(serverError);
        this.loginFormContainer.appendChild(form)
    }
}