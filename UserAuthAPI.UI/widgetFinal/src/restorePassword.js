import Http from './http'
import Helpers from './helpers'
import {Settings} from './settingsManager'
export default class RestorePassword{
    constructor(){
        this.restoreUI = new RestorePasswordUI();
        this.restoreUI.renderRestoreForm(this.restoreFormSubmit);
       
        this.restorePasswordSubmit = this.restoreFormSubmit.bind(this);
    }
    restoreFormSubmit(e){
        e.preventDefault();
        let form = document.getElementById("restorePasswordForm");

        if(Helpers.passwordValidator(null, form.elements.password) & 
            Helpers.passwordValidator(null, form.elements.passwordRepeat)){
                Http.post(Settings["APIHost"]+'/resetPassword', "email=mariiachdev@gmail.com"+"&password="+form.elements.password.value, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res)=>{
                    window.location = Settings["RegistrationRedirect"]
                }).catch((e)=>{
                    let errorContainer = document.getElementById('server-error');
                        errorContainer.innerText = e;
                })
        }
    }
} 
class RestorePasswordUI{
    constructor(){
        this.restorePasswordContainer = document.getElementById("restore-password");
        this.restoreFormFields = [{
            tagName: 'input',
            type: 'password',
            name: 'password',
            placeholder: "enter your password",
            className: "login-reg-input"
        },
        {
            tagName: 'input',
            type: 'password',
            name: 'passwordRepeat',
            placeholder: "repeat password",
            className: "login-reg-input"
        },
        {
            tagName: 'button',
            type: 'submit',
            innerText: "Save password",
            className: "login-reg-button"
        }];
    }
    renderRestoreForm(restorePasswordSubmit){
        if(!this.restorePasswordContainer) return
        let form = document.createElement('form');
        form.name = "restorePasswordForm";
        form.id = "restorePasswordForm";
        form.addEventListener('submit', restorePasswordSubmit);

        let newThis = this;
        this.restoreFormFields.forEach((item)=> {
            let events = {};
            if(item.type == "password"){
                events = {
                    "blur": Helpers.passwordValidator,
                    "focus": Helpers.removeError
                }
            }
            
            Helpers.renderElement(item, form, events);   
        });
         let serverError = document.createElement("div");
            serverError.className = 'form-error';
            serverError.id = 'server-error';
            form.appendChild(serverError);
        this.restorePasswordContainer.appendChild(form);
        
    }
}