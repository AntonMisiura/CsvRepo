/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsCookie = __webpack_require__(4);

var Cookies = _interopRequireWildcard(_jsCookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Helpers = function () {
    function Helpers() {
        _classCallCheck(this, Helpers);
    }

    _createClass(Helpers, null, [{
        key: "userDataStringFormer",
        value: function userDataStringFormer(loginType, loginObj) {
            return "loginType=" + loginType + "&logindata=" + JSON.stringify(loginObj);
        }
    }, {
        key: "cookiesSetter",
        value: function cookiesSetter(startTime, endTime, userName, userID, startURL, jwtToken) {

            Cookies.set('JWT-Cookie', jwtToken, { 'created': startTime, 'expires': new Date(endTime) });
            Cookies.set('USER_SESSION', { startURL: startURL, UserID: userID, startDate: startTime, expirationDate: endTime, userName: userName }, { 'created': startTime, 'expires': new Date(endTime) });
        }
    }, {
        key: "cookieRemover",
        value: function cookieRemover() {
            Cookies.remove('JWT-Cookie', { 'created': '', 'expires': '' });
            Cookies.remove('USER_SESSION', { startURL: '', UserID: '', startDate: '', expirationDate: '', userName: '' }, { 'created': '', 'expires': '' });
        }
    }, {
        key: "getRedirectUrl",
        value: function getRedirectUrl() {
            var sourcePage = document.referrer;
            if (document.referrer.includes(window.location.hostname)) {
                if (document.referrer.includes("login")) {
                    return "/dist/office.html";
                }
                return sourcePage;
            } else {
                return "/dist/index.html";
            }
        }
    }, {
        key: "emailValidator",
        value: function emailValidator(e, input) {
            var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (e) {
                return Helpers.validator(emailRegex, 'Email is invalid', e.target);
            }
            if (input) {
                return Helpers.validator(emailRegex, 'Email is invalid', input);
            }
        }
    }, {
        key: "passwordValidator",
        value: function passwordValidator(e, input) {
            var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
            if (e) {
                return Helpers.validator(passwordRegex, 'Password must contain minimum 6 characters: at least 1 alphabet and 1 number', e.target);
            }
            if (input) {
                return Helpers.validator(passwordRegex, 'Password must contain minimum 6 characters: at least 1 alphabet and 1 number', input);
            }
        }
    }, {
        key: "removeError",
        value: function removeError() {

            if (this.classList.contains('error')) {
                this.classList.remove('error');
                this.nextSibling.remove();
            }
        }
    }, {
        key: "isNotEmpty",
        value: function isNotEmpty(value) {
            if (value !== '') {
                return true;
            }
            return false;
        }
    }, {
        key: "validator",
        value: function validator(regexString, errorMessage, input) {
            if (!regexString.test(input.value)) {
                if (!input.nextSibling.classList.contains('form-error')) {
                    input.classList.add('error');
                    var emailError = document.createElement('div');
                    emailError.className = "form-error";
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
    }]);

    return Helpers;
}();

exports.default = Helpers;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Http = function () {
    function Http() {
        _classCallCheck(this, Http);
    }

    _createClass(Http, null, [{
        key: 'get',
        value: function get(url, data, headers) {

            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);

                xhr.onload = function () {
                    if (this.status == 200) {
                        resolve(this.response);
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };

                xhr.onerror = function () {
                    reject(new Error("Network Error"));
                };

                xhr.send();
            });
        }
    }, {
        key: 'post',
        value: function post(url, data, headers) {

            return new Promise(function (resolve, reject) {

                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                if (headers) {
                    for (var key in headers) {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                }

                xhr.onload = function () {
                    if (this.status == 200) {

                        resolve(JSON.parse(this.response));
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };

                xhr.onerror = function () {
                    reject(new Error("Network Error"));
                };

                xhr.send(data);
            });
        }
    }]);

    return Http;
}();

exports.default = Http;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var loginTypes = {
    login: "login",
    register: "Internal",
    facebook: "Facebook",
    google: "Google"
};
exports.loginTypes = loginTypes;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var Host = exports.Host = "http://localhost:53506";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.1.4
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExternalUser = exports.ExternalUser = function ExternalUser(Id, Name, Email, Token, StartDate, EndDate, LoginType) {
    _classCallCheck(this, ExternalUser);

    this.id = Id;
    this.email = Email;
    this.userName = Name;
    this.token = Token;
    this.loginType = LoginType;
    this.startDate = StartDate;
    this.endDate = EndDate;
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsCookie = __webpack_require__(4);

var Cookies = _interopRequireWildcard(_jsCookie);

var _login = __webpack_require__(7);

var _login2 = _interopRequireDefault(_login);

var _styles = __webpack_require__(8);

var _facebook = __webpack_require__(9);

var _facebook2 = _interopRequireDefault(_facebook);

var _google = __webpack_require__(10);

var _google2 = _interopRequireDefault(_google);

var _registration = __webpack_require__(11);

var _registration2 = _interopRequireDefault(_registration);

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LoginWidget = function () {
    function LoginWidget() {
        _classCallCheck(this, LoginWidget);

        this.userSession = this.getCookies();
        this.signOut = this.signOut.bind(this);
        this.loginRegisterButtons = [{
            tagName: 'a',
            innerText: "registration",
            href: "registration.html",
            class: "login-reg-link reg"
        }, {
            tagName: 'a',
            innerText: "login",
            href: "login.html",
            class: "login-reg-link"
        }];

        this.styles = _styles.widgetStyles;

        this.applyStyles(this.styles);

        this.login = new _login2.default();
        this.registration = new _registration2.default();
        this.fb = new _facebook2.default();
        this.g = new _google2.default();
        this.component();
    }

    _createClass(LoginWidget, [{
        key: 'applyStyles',
        value: function applyStyles(styles) {
            var widgetStyles = document.createElement('style');
            widgetStyles.innerHTML = styles;
            document.head.appendChild(widgetStyles);
        }
    }, {
        key: 'getCookies',
        value: function getCookies() {
            return Cookies.getJSON('USER_SESSION');
        }
    }, {
        key: 'cookieStatus',
        value: function cookieStatus() {
            var lifeTime = this.userSession.expirationDate - this.userSession.startDate;
            var difference = Date.now() - this.userSession.startDate;

            if (difference > lifeTime / 3 * 2) {
                return 'renew';
            }
            return 'ok';
        }
    }, {
        key: 'signOut',
        value: function signOut() {
            var _this = this;

            _helpers2.default.cookieRemover();
            this.fb.isSignedIn().then(function (res) {
                if (res) {
                    _this.fb.logout();
                }
            });

            if (this.g.isSignedIn()) {
                this.g.signOut();
            }
            window.location = "/dist/index.html";
        }
    }, {
        key: 'component',
        value: function component() {
            var element = document.getElementById('login-widget');

            if (this.userSession) {

                var status = this.cookieStatus();
                if (status === 'renew') {
                    element.innerHTML = "Needs to be renewed";
                    this.g.refreshToken();
                } else {
                    element.innerHTML = "Hello " + this.userSession.userName;
                    var signOutButton = document.createElement("button");
                    signOutButton.className = "login-reg-link reg";
                    signOutButton.type = "button";
                    signOutButton.innerText = "Sign Out";
                    signOutButton.addEventListener('click', this.signOut);
                    element.appendChild(signOutButton);
                }
            } else {

                this.loginRegisterButtons.forEach(function (item, i, arr) {
                    var link = document.createElement(item.tagName);
                    link.innerText = item.innerText;
                    link.href = item.href;
                    link.className = item.class;
                    element.appendChild(link);
                });
            }
        }
    }]);

    return LoginWidget;
}();

var lw = new LoginWidget();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = __webpack_require__(1);

var _http2 = _interopRequireDefault(_http);

var _loginTypes = __webpack_require__(2);

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

var _settings = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Login = function () {
    function Login() {
        _classCallCheck(this, Login);

        this.loginFields = [{
            tagName: 'input',
            type: 'email',
            name: 'email',
            placeholder: "you@example.org",
            className: "login-reg-input"
        }, {
            tagName: 'input',
            type: 'password',
            name: 'password',
            placeholder: "************",
            className: "login-reg-input"
        }, {
            tagName: 'div',
            id: 'toggleForgot',
            className: "forgot-password-link",
            innerText: "Forgot password?"
        }, {
            tagName: 'button',
            type: 'submit',
            innerText: "Login",
            className: "login-reg-button"
        }];
        this.renderLoginForm();
    }

    _createClass(Login, [{
        key: 'submit',
        value: function submit(e) {
            e.preventDefault();
            if (_helpers2.default.emailValidator(null, this.elements.email) & _helpers2.default.passwordValidator(null, this.elements.password)) {

                var startDate = Date.now();
                var endDate = startDate + 72 * 1000;

                var objToSend = {
                    email: this.elements.email.value,
                    password: this.elements.password.value,
                    startDate: startDate
                };
                var dataString = _helpers2.default.userDataStringFormer(_loginTypes.loginTypes.login, objToSend);
                var redirectUrl = _helpers2.default.getRedirectUrl();
                _helpers2.default.cookiesSetter(startDate, endDate, "Vasia", "", redirectUrl, "1234567");

                window.location = redirectUrl;
                /*
                                Http.post(Host+'/login',
                                    dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                                          var redirectUrl = Helpers.getRedirectUrl();
                                        Helpers.cookiesSetter(startDate, endDate, "123", res.userName, redirectUrl, res.jwtToken);
                                        console.log(res.userName)
                                        window.location = redirectUrl;
                                     
                                      }).catch((e) => {
                                        console.warn(e)
                                })*/
            } else return;
        }
    }, {
        key: 'addForgotForm',
        value: function addForgotForm(parent) {

            var forgotPasswordForm = document.createElement("form");
            forgotPasswordForm.className = "hidden";
            forgotPasswordForm.id = "forgotForm";
            forgotPasswordForm.name = "forgotPasswordForm";
            forgotPasswordForm.addEventListener('click', this.forgotPassword);

            var input = document.createElement("input");
            input.type = "text";
            input.placeholder = "Enter email";
            input.className = "login-reg-input";
            input.name = "emailForgot";

            var button = document.createElement("button");
            button.type = "button";
            button.innerText = "Restore password";
            button.className = "login-reg-button";

            forgotPasswordForm.appendChild(input);
            forgotPasswordForm.appendChild(button);

            parent.appendChild(forgotPasswordForm);
        }
    }, {
        key: 'forgotPassword',
        value: function forgotPassword(e) {
            var email = this.elements.emailForgot.value;
            _http2.default.post('http://localhost:11286/restore', email, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (res) {
                console.warn(res);
            }).catch(function (e) {
                console.warn(e);
            });
        }
    }, {
        key: 'toggleForgotForm',
        value: function toggleForgotForm() {
            var forgotPasswordBlock = document.getElementById("forgotForm");
            if (forgotPasswordBlock.classList.contains("hidden")) {
                forgotPasswordBlock.classList.remove("hidden");
            } else {
                forgotPasswordBlock.classList.add("hidden");
            }
        }
    }, {
        key: 'renderLoginForm',
        value: function renderLoginForm() {
            var loginForm = document.getElementById('login-form');

            if (loginForm) {
                var form = document.createElement('form');
                form.name = "loginForm";
                var newThis = this;
                this.loginFields.forEach(function (item, i, arr) {
                    var element = document.createElement(item.tagName);
                    if (item.innerText) {
                        element.innerText = item.innerText;
                    }
                    if (item.placeholder) {
                        element.placeholder = item.placeholder;
                    }
                    element.type = item.type;
                    if (item.name) {
                        element.name = item.name;
                        if (element.name === 'email') {
                            if (document.addEventListener) {
                                element.addEventListener("blur", _helpers2.default.emailValidator);
                                element.addEventListener("focus", _helpers2.default.removeError);
                            }
                        }
                        if (element.name === 'password') {
                            if (document.addEventListener) {
                                element.addEventListener("blur", _helpers2.default.passwordValidator);
                                element.addEventListener("focus", _helpers2.default.removeError);
                            }
                        }
                    }
                    if (item.id) {

                        element.id = item.id;
                        if (element.id === 'toggleForgot') {
                            if (document.addEventListener) {
                                element.addEventListener("click", newThis.toggleForgotForm);
                            } else if (document.attachEvent) {
                                element.attachEvent("onclick", newThis.toggleForgotForm);
                            }
                        }
                    }

                    element.className = item.className;
                    form.appendChild(element);
                });

                if (document.addEventListener) {
                    form.addEventListener("submit", this.submit);
                } else if (document.attachEvent) {
                    form.attachEvent("onsubmit", this.submit);
                }
                loginForm.appendChild(form);
                this.addForgotForm(loginForm);
            } else return;
        }
    }]);

    return Login;
}();

exports.default = Login;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var widgetStyles = "\n            .visible{\n                display: block;\n\n            }\n            .hidden{\n                display: none;\n            }\n            .login-reg-link{\n\n                display: inline-block; \n                margin-right: 10px; \n                width: 100px; text-align:center; \n                display: inline-block;\n                position: relative;\n                padding: .61538462em 1em;\n                vertical-align: middle;\n                min-height: 2.46153846em;\n                box-sizing: border-box;\n                font-weight: 400;\n                font-family: inherit;\n                line-height: 1;\n                text-align: center;\n                text-decoration: none;\n                background-color: transparent;\n                border-radius: 2px;\n                border: 1px solid transparent;\n                cursor: pointer;\n                outline: none;\n                touch-action: manipulation;\n                transition: all .1s ease-in;\n                text-decoration: none; \n                padding: 6px 12px;\n                transition: 0.3s ease-in-out;\n                color: #07C;\n                background-color: rgba(0,119,204,0);\n                border-color: transparent;\n                box-shadow: none;\n            }\n            .login-reg-link:hover{\n                    color: #005999;\n                    background-color: rgba(0,119,204,0.1);\n                    border-color: transparent;\n                    box-shadow: none;\n            }\n            .forgot-password-link{\n                    position: relative;\n                    top: -8px;\n                    color: #9fa6ad;\n                    font-size: 11px;\n                    font-weight: normal;\n                    cursor: pointer;\n                    text-align: right;\n            }\n            .forgot-password-link:hover{\n                color: #000;\n            }\n\n            .login-reg-button{\n                text-align: center;\n                background: #07C;\n                color: #FFF;\n                border-radius: 3px;\n                width: 100%;\n                padding: 12px;\n                box-shadow: none;\n                text-shadow: none;\n                text-decoration: none;\n                border: none;\n                cursor: pointer;\n                margin-bottom: 0 !important;\n            }\n            .reg{\n                    color: #FFF;\n    background-color: #0095ff;\n    border-color: #07c;\n    box-shadow: inset 0 1px 0 #66bfff;\n            }\n.reg:hover{\n        color: rgba(255,255,255,0.9);\n    background-color: #07c;\n    border-color: #005999;\n    box-shadow: inset 0 1px 0 #3af;\n}\n            .login-reg-form{\n    width: 280px;\n    margin: 0 auto;\n    padding: 30px;\n    border: 1px solid #e4e6e8;\n    background: #FFF;\n}\n.login-reg-input{    width: 100%;\n    line-height: 1.3;\n    font-size: 100%;\n    padding: 8px;\n    margin-bottom: 10px;\n    \n    border: 1px solid #e4e6e8;\n    border-radius: 0;\n    cursor: auto !important;\n}\n.login-reg-input:hover, .login-reg-input:focus\n{\n        border: 1px solid lightblue !important;\n}\n    .form-error{\n        color: red;\n    }\nbutton {\n    height: auto;\n    border: none;\n    margin-bottom: 10px;\n    cursor: pointer;\n    &:focus {\n        outline: none;\n    }\n    &[disabled] {\n        cursor: default;\n    }\n}\n.facebook-button{\n    background-color: #4267b2;\n    font-family: Helvetica, Arial, sans-serif;\n    color: #fff;\n    border: none;\n    height: 40px;\n    letter-spacing: .25px;\n    font-size: 14px;\n    border-radius: 2px;\n    overflow: hidden;\n    text-align: center;\n    text-overflow: clip;\n    white-space: nowrap;\n    vertical-align: middle;\n    position: relative;\n    width: 100%;\n\n    \n}\n.fb-logo{\n        width: 40px;\n        height: 40px;\n        display: block;\n        position: absolute;\n        left: 0px;\n        top: 3px;\n        padding-top: 6px;\n    }\n    .fb-svg{\n        width: 24px;\n        height: 24px;\n\n    }\n.google-button{\n    background-color: #4285f4;\n    font-family: Roboto,arial,sans-serif;\n    color: #fff;\n    height: 40px;\n    width: 100%;\n    font-weight: 500;\n    letter-spacing: .21px;\n    vertical-align: top;\n    font-size: 14px;\n    position: relative;\n}\n.g-logo{\n        background-color: #fff;\n        width: 24px;\n        height:24px;\n        position:  absolute;\n        left: 9px;\n        top:8px;\n\n    }\n    .g-svg{\n        margin-top: 3px;\n    }\n\n\n\n\n        ";
exports.widgetStyles = widgetStyles;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = __webpack_require__(5);

var _loginTypes = __webpack_require__(2);

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

var _http = __webpack_require__(1);

var _http2 = _interopRequireDefault(_http);

var _settings = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FacebookLogin = function () {
    function FacebookLogin() {
        _classCallCheck(this, FacebookLogin);

        this.scope = ['public_profile', 'email'].join(',');
        this.fields = ['name', 'email'].join(',');

        this.appSettings = {
            appId: '720460194825623',
            cookie: true,
            xfbml: true,
            version: 'v2.8'
        };
        this.init(this.appSettings);
        this.button = document.getElementById('fb');
        this.login = this.login.bind(this);
        this.getLoginStatus = this.getLoginStatus.bind(this);
        if (this.button) {
            this.button.addEventListener('click', this.login);
        }
    }

    _createClass(FacebookLogin, [{
        key: 'init',
        value: function init(params) {
            try {
                return Promise.resolve(FB.init(params));
            } catch (e) {
                return Promise.reject(e);
            }
        }
    }, {
        key: 'getLoginStatus',
        value: function getLoginStatus() {
            var that = this;
            FB.getLoginStatus(function (response) {
                that.statusChangeCallback(response);
            });
        }
    }, {
        key: 'isSignedIn',
        value: function isSignedIn() {
            return new Promise(function (resolve, reject) {
                FB.getLoginStatus(function (response) {
                    if (response.status === 'connected') {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        }
    }, {
        key: 'statusChangeCallback',
        value: function statusChangeCallback(response) {
            var _this = this;

            if (response.status === 'connected') {
                this.fetchUserInfo(this.fields).then(function (_userData) {
                    var obj = { authRes: response, userData: _userData };
                    _this.sendUserData(obj);
                });
            };
        }
    }, {
        key: 'login',
        value: function login() {
            var that = this;

            FB.login(function (response) {

                if (response.authResponse) {
                    that.statusChangeCallback(response, true);
                }
            }, { scope: that.scope });
        }
    }, {
        key: 'logout',
        value: function logout() {
            FB.logout(function (response) {
                console.log(response);
            });
        }
    }, {
        key: 'fetchUserInfo',
        value: function fetchUserInfo(fields) {
            return this.api('/me', { 'fields': this.fields });
        }
    }, {
        key: 'api',
        value: function api(url, params) {
            return new Promise(function (resolve, reject) {
                try {
                    FB.api(url, params, function (response) {
                        resolve(response);
                    });
                } catch (e) {
                    reject(e);
                }
            });
        }
    }, {
        key: 'sendUserData',
        value: function sendUserData(loginData) {
            console.warn(loginData);
            if (loginData.userData != undefined) {

                var startDate = Date.now();
                var expiresIn = loginData.authRes.authResponse.expiresIn;
                //var endDate = startDate + expiresIn * 1000;
                var endDate = startDate + 36 * 1000;

                var fbUser = new _models.ExternalUser(loginData.userData.id, loginData.userData.name, loginData.userData.email, loginData.authRes.authResponse.accessToken, startDate, endDate, _loginTypes.loginTypes.facebook);

                var redirectUrl = _helpers2.default.getRedirectUrl();
                _helpers2.default.cookiesSetter(startDate, endDate, loginData.userData.name, "", redirectUrl, "12345");
                window.location = redirectUrl;
                var dataString = _helpers2.default.userDataStringFormer(_loginTypes.loginTypes.facebook, fbUser);
                /*
                            Http.post(Host + '/token',
                                dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                                var redirectUrl = Helpers.getRedirectUrl();
                                Helpers.cookiesSetter(startDate, endDate, "", loginData.userData.name, redirectUrl, res.jwtToken);
                                window.location = redirectUrl;
                            }).catch((e) => {
                                console.warn(e)
                            })*/
            }
        }
    }]);

    return FacebookLogin;
}();

exports.default = FacebookLogin;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _models = __webpack_require__(5);

var _loginTypes = __webpack_require__(2);

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

var _http = __webpack_require__(1);

var _http2 = _interopRequireDefault(_http);

var _settings = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleLogin = function () {
    function GoogleLogin() {
        _classCallCheck(this, GoogleLogin);

        this.login = this.login.bind(this);
        this.isSignedIn = this.isSignedIn.bind(this);
        this.initG = this.initG.bind(this);
        this.loginSteps = this.loginSteps.bind(this);
        this.refresher = this.refresher.bind(this);
        this.appSettings = {
            client_id: '27904284775-2fgvom9li6v7uv8b8cjvv1iktsaokbf1.apps.googleusercontent.com',
            cookiepolicy: 'single_host_origin',
            scope: 'profile email',
            ux_mode: 'popup',
            redirect_uri: 'http://localhost:4200'
        };
        this.connect(this.initG);

        this.button = document.getElementById('g');
        if (this.button) {
            this.button.addEventListener('click', this.login);
        }
    }

    _createClass(GoogleLogin, [{
        key: 'connect',
        value: function connect(connectCallBack) {
            gapi.load('auth2', connectCallBack);
        }
    }, {
        key: 'initG',
        value: function initG() {
            gapi.auth2.init(this.appSettings);
        }
    }, {
        key: 'fetchUser',
        value: function fetchUser() {
            if (this.googleAuth && this.googleAuth.currentUser) {
                this.getUserData(this.googleAuth.currentUser.get());
            }
        }
    }, {
        key: 'login',
        value: function login() {
            if (gapi.auth2 === undefined) {
                this.connect(this.loginSteps);
            } else {
                this.loginSteps();
            }
        }
    }, {
        key: 'refreshToken',
        value: function refreshToken() {
            if (gapi.auth2 === undefined) {
                this.connect(this.refresher);
            } else {
                this.refresher();
            }
        }
    }, {
        key: 'refresher',
        value: function refresher() {
            var _this = this;

            var authInstance = gapi.auth2.getAuthInstance();
            var googleUser = authInstance.currentUser.get();

            googleUser.reloadAuthResponse().then(function (info) {

                _this.getUserData(googleUser);
            });
        }
    }, {
        key: 'loginSteps',
        value: function loginSteps() {
            var that = this;
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signIn({
                scope: 'profile email'
            }).then(function (res) {
                that.getUserData(res);
            });
        }
    }, {
        key: 'isSignedIn',
        value: function isSignedIn() {
            gapi.auth2.getAuthInstance().isSignedIn.get();
        }
    }, {
        key: 'signOut',
        value: function signOut() {

            gapi.auth2.getAuthInstance().signOut().then(function (user) {
                console.log('User signed out.');
            });
        }
    }, {
        key: 'getUserData',
        value: function getUserData(googleUser) {
            if (googleUser.El != null) {

                console.log(googleUser);
                var profile = googleUser.getBasicProfile();
                var authResp = googleUser.getAuthResponse();

                var startDate = Date.now();
                var expiresIn = authResp.expires_in;
                //var endDate = startDate + expiresIn * 1000;
                var endDate = startDate + 36 * 1000;

                var gu = new _models.ExternalUser(profile.getId(), profile.getName(), profile.getEmail(), authResp.id_token, startDate, endDate, _loginTypes.loginTypes.google);

                var redirectUrl = _helpers2.default.getRedirectUrl();

                _helpers2.default.cookiesSetter(startDate, endDate, profile.getName(), "123", redirectUrl, "654848848");

                window.location = redirectUrl;

                var dataString = _helpers2.default.userDataStringFormer(_loginTypes.loginTypes.google, gu);

                /* Http.post(Host + '/token',
                     dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                     console.warn(res)
                 }).catch((e) => {
                     console.warn(e)
                 });*/
            }
        }
    }]);

    return GoogleLogin;
}();

exports.default = GoogleLogin;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = __webpack_require__(1);

var _http2 = _interopRequireDefault(_http);

var _loginTypes = __webpack_require__(2);

var _helpers = __webpack_require__(0);

var _helpers2 = _interopRequireDefault(_helpers);

var _settings = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Registration = function () {
    function Registration() {
        _classCallCheck(this, Registration);

        this.regFields = [{
            tagName: 'input',
            type: 'text',
            name: 'name',
            placeholder: "John Doe",
            className: "login-reg-input"
        }, {
            tagName: 'input',
            type: 'email',
            name: 'email',
            placeholder: "you@example.org",
            className: "login-reg-input"
        }, {
            tagName: 'input',
            type: 'password',
            name: 'password',
            placeholder: "************",
            className: "login-reg-input"
        }, {
            tagName: 'button',
            type: 'submit',
            innerText: "Registration",
            className: "login-reg-button"
        }];

        this.renderRegForm();
    }

    _createClass(Registration, [{
        key: 'submit',
        value: function submit(e) {
            e.preventDefault();
            if (_helpers2.default.emailValidator(null, this.elements.email) & _helpers2.default.passwordValidator(null, this.elements.password) & _helpers2.default.isNotEmpty(this.elements.name.value)) {
                var objToSend = {
                    email: this.elements.email.value,
                    password: this.elements.password.value,
                    userName: this.elements.name.value
                };
                var dataString = _helpers2.default.userDataStringFormer(_loginTypes.loginTypes.register, objToSend);
                window.location = "/dist/login.html";
                /*  Http.post(Host + '/token',
                      dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then((res) => {
                      console.warn(res)
                  }).catch((e) => {
                      console.warn(e)
                  })*/
            } else return;
        }
    }, {
        key: 'renderRegForm',
        value: function renderRegForm() {
            var regFormDiv = document.getElementById('reg-form');

            if (regFormDiv) {
                var form = document.createElement('form');
                form.name = "regForm";
                var newThis = this;
                this.regFields.forEach(function (item, i, arr) {
                    var element = document.createElement(item.tagName);
                    if (item.innerText) {
                        element.innerText = item.innerText;
                    }
                    if (item.placeholder) {
                        element.placeholder = item.placeholder;
                    }
                    element.type = item.type;

                    if (item.name) {
                        element.name = item.name;
                        if (element.name === 'email') {
                            if (document.addEventListener) {
                                element.addEventListener("blur", _helpers2.default.emailValidator);
                                element.addEventListener("focus", _helpers2.default.removeError);
                            }
                        }
                        if (element.name === 'password') {
                            if (document.addEventListener) {
                                element.addEventListener("blur", _helpers2.default.passwordValidator);
                                element.addEventListener("focus", _helpers2.default.removeError);
                            }
                        }
                    }

                    element.className = item.className;
                    form.appendChild(element);
                });

                if (document.addEventListener) {
                    form.addEventListener("submit", this.submit);
                } else if (document.attachEvent) {
                    form.attachEvent("onsubmit", this.submit);
                }
                regFormDiv.appendChild(form);
            } else return;
        }
    }]);

    return Registration;
}();

exports.default = Registration;

/***/ })
/******/ ]);