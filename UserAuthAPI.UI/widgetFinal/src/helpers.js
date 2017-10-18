import * as Cookies from "js-cookie";
export default class Helpers {
    static userDataStringFormer(loginType, loginObj) {
        return "actiontype=" + loginType + "&logindata=" + JSON.stringify(loginObj);
    }
    static cookiesSetter(startTime, endTime, userName, userID, startURL, jwtToken) {


        Cookies.set('JWT-Cookie', jwtToken, { 'created': startTime, 'expires': new Date(endTime) });
        Cookies.set('USER_SESSION', { startURL: startURL, UserID: userID, startDate: startTime, expirationDate: endTime, userName: userName }, { 'created': startTime, 'expires': new Date(endTime) });
    }
    static cookieRemover() {
        Cookies.remove('JWT-Cookie', { 'created': '', 'expires': '' });
        Cookies.remove('USER_SESSION', { startURL: '', UserID: '', startDate: '', expirationDate: '', userName: '' }, { 'created': '', 'expires': '' });
    }

    static getRedirectUrl() {
        var sourcePage = document.referrer;
        if ((document.referrer).includes(window.location.hostname)) {
            if ((document.referrer).includes("login")) {
                return "/dist/office.html"
            }
            return sourcePage;
        } else {
            return "/dist/index.html"
        }
    }
    static emailValidator(e, input) {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (e) {
            return Helpers.validator(emailRegex, 'Email is invalid', e.target);
        }
        if (input) {
            return Helpers.validator(emailRegex, 'Email is invalid', input);
        }



    }
    static passwordValidator(e, input) {
        var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (e) {
            return Helpers.validator(passwordRegex, 'Password must contain minimum 6 characters: at least 1 alphabet and 1 number', e.target);
        }
        if (input) {
            return Helpers.validator(passwordRegex, 'Password must contain minimum 6 characters: at least 1 alphabet and 1 number', input);
        }
    }
    static removeError() {

        if (this.classList.contains('error')) {
            this.classList.remove('error');
            this.nextSibling.remove();
        }


    }
    static isNotEmpty(value) {
        if (value !== '') { return true; }
        return false;
    }
    static passwordMatchValidator(){
        
    }
    static validator(regexString, errorMessage, input) {
        if (!regexString.test(input.value)) {
            if (!input.nextSibling.classList.contains('form-error')) {
                input.classList.add('error');
                var emailError = document.createElement('div');
                emailError.className = "form-error"
                emailError.innerHTML = errorMessage;
                var parent = input.parentNode;
                var next = input.nextSibling;
                if (next) {
                    parent.insertBefore(emailError, next);
                } else {
                    parent.appendChild(emailError);
                }
            }
            return false;
        }
        return true;
    }
    static GetUTCMilliseconds() {
        var now = new Date();
        return Date.UTC(now.getUTCFullYear(),
            now.getUTCMonth(), now.getUTCDate(),
            now.getUTCHours(), now.getUTCMinutes(),
            now.getUTCSeconds(), now.getUTCMilliseconds());
    }
    static GetUTCDate() {
        var now = new Date();
        return now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(),
            now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    }
    static renderElement(element, parentElement, events) {
        var elem = document.createElement(element.tagName);
        for (let key in element) {
            if (key != "tagName") {
                elem[key] = element[key];
            }
        }
        if (events) {
            for (let key in events) {
                elem.addEventListener(key, events[key]);
            }
        }
        parentElement.appendChild(elem);
    }
}