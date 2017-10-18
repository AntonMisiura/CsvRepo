(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Widget"] = factory();
	else
		root["Widget"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Http = function () {
    function Http() {
        _classCallCheck(this, Http);
    }

    _createClass(Http, null, [{
        key: 'get',
        value: function get(url, data, headers, parseMethod) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = function () {
                    if (this.status == 200) {
                        if (parseMethod) {
                            resolve(parseMethod(this.response));
                        } else {
                            resolve(JSON.parse(this.response));
                        }
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        reject(error);
                    }
                };
                xhr.onerror = function () {
                    reject(new Error("Network Error"));
                };
                if (data) {
                    xhr.send(data);
                } else {
                    xhr.send();
                }
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
                    if (this.status === 200) {
                        if (this.response) {
                            resolve(JSON.parse(this.response));
                        }
                        resolve();
                    } else {
                        var error = new Error(this.statusText);
                        error.code = this.status;
                        console.error(this.status);
                        reject(error);
                    }
                };
                xhr.onerror = function (error) {
                    reject("Server error");
                };

                xhr.send(data);
            });
        }
    }]);

    return Http;
}();

exports.default = Http;

/***/ }),
/* 1 */
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
            return "actiontype=" + loginType + "&logindata=" + JSON.stringify(loginObj);
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
        key: "passwordMatchValidator",
        value: function passwordMatchValidator() {}
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
    }, {
        key: "GetUTCMilliseconds",
        value: function GetUTCMilliseconds() {
            var now = new Date();
            return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        }
    }, {
        key: "GetUTCDate",
        value: function GetUTCDate() {
            var now = new Date();
            return now_utc = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
        }
    }, {
        key: "renderElement",
        value: function renderElement(element, parentElement, events) {
            var elem = document.createElement(element.tagName);
            for (var key in element) {
                if (key != "tagName") {
                    elem[key] = element[key];
                }
            }
            if (events) {
                for (var _key in events) {
                    elem.addEventListener(_key, events[_key]);
                }
            }
            parentElement.appendChild(elem);
        }
    }]);

    return Helpers;
}();

exports.default = Helpers;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Settings = exports.IP = exports.SettingsManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = __webpack_require__(0);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Settings = "";
var IP = "";

var SettingsManager = exports.SettingsManager = function () {
    function SettingsManager() {
        _classCallCheck(this, SettingsManager);
    }

    _createClass(SettingsManager, null, [{
        key: "connection",
        value: function connection(url) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            xhr.send();
            if (xhr.status == 200) {
                var r = xhr.response;
                exports.Settings = Settings = JSON.parse(r);
                return JSON.parse(r);
                console.log(r);
            } else {
                var error = new Error(xhr.statusText);
                error.code = xhr.status;
            }
        }
    }, {
        key: "ipReader",
        value: function ipReader() {
            _http2.default.get('//freegeoip.net/json/?callback=?', null, null, function (data) {
                var cutted = data.substring(2, data.length - 2);
                return JSON.parse(cutted, null, 2);
            }).then(function (res) {
                exports.IP = IP = res.ip;
            });
        }
    }, {
        key: "ReadSettings",
        value: function ReadSettings(settingsFetcher) {
            var set = this.connection('/widget-settings.json');
            settingsFetcher(set);
        }
    }]);

    return SettingsManager;
}();

exports.IP = IP;
exports.Settings = Settings;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var actionTypes = {
    login: "Internal",
    register: "Register",
    facebook: "Facebook",
    google: "Google"
};
exports.actionTypes = actionTypes;

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


module.exports = __webpack_require__(7).default;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsCookie = __webpack_require__(4);

var Cookies = _interopRequireWildcard(_jsCookie);

var _facebook = __webpack_require__(8);

var _facebook2 = _interopRequireDefault(_facebook);

var _google = __webpack_require__(9);

var _google2 = _interopRequireDefault(_google);

var _login = __webpack_require__(10);

var _login2 = _interopRequireDefault(_login);

var _registration = __webpack_require__(11);

var _registration2 = _interopRequireDefault(_registration);

var _restorePassword = __webpack_require__(12);

var _restorePassword2 = _interopRequireDefault(_restorePassword);

var _settingsManager = __webpack_require__(2);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _styles = __webpack_require__(13);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Widget = function () {
    function Widget() {
        _classCallCheck(this, Widget);

        this.userSession = this.getCookies();
        this.widgetUI = new WidgetUI();
        this.widgetUI.applyStyles(_styles.widgetStyles);

        this.cookieStatuses = {
            renew: 0,
            ok: 1
        };
        _settingsManager.SettingsManager.connection('/widget-settings.json');
        _settingsManager.SettingsManager.ipReader();
        var login = new _login2.default();
        var reg = new _registration2.default();
        this.fb = new _facebook2.default();
        this.g = new _google2.default();
        this.restorePassword = new _restorePassword2.default();
        this.signOut = this.signOut.bind(this);
        this.main();
    }

    _createClass(Widget, [{
        key: 'signOut',
        value: function signOut() {
            var _this = this;

            console.log("SignOut");
            _helpers2.default.cookieRemover();
            var prom = new Promise(function (resolve, reject) {
                console.log(_this);
                _this.fb.isSignedIn().then(function (res) {
                    if (res) {

                        _this.fb.signOut();
                        resolve(true);
                    }
                });
                if (_this.g.isSignedIn()) {
                    _this.g.signOut();
                    resolve(true);
                }
                resolve(true);
            });
            prom.then(function (res) {
                if (res) {
                    window.location = _settingsManager.Settings["SignOutRedirect"];;
                }
            });
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
                return this.cookieStatuses.renew;
            }
            return this.cookieStatuses.ok;
        }
    }, {
        key: 'main',
        value: function main() {
            var _this2 = this;

            if (this.userSession) {
                var status = this.cookieStatus();
                if (status === this.cookieStatuses.ok) {
                    this.widgetUI.cleanWidget();
                    this.widgetUI.renderGreetings(this.userSession.userName !== undefined ? this.userSession.userName : "User");
                    this.widgetUI.renderSignoutButton({ "click": this.signOut });
                } else if (status === this.cookieStatuses.renew) {

                    this.g.connect(function () {
                        if (_this2.g.isSignedIn()) {
                            _this2.g.refreshToken();
                        }
                    });
                    this.fb.init(_settingsManager.Settings["FacebookApp"]).then(function (res) {
                        _this2.fb.isSignedIn().then(function (res) {
                            if (res) {

                                _this2.fb.login();
                            }
                        });
                    });
                }
            } else {
                this.widgetUI.cleanWidget().renderLoginLink().renderRegisterLink();
            }
        }
    }]);

    return Widget;
}();

var WidgetUI = function () {
    function WidgetUI() {
        _classCallCheck(this, WidgetUI);

        this.widgetContainer = document.getElementById("auth-widget");
        this.loginLink = {
            tagName: 'a',
            innerText: "login",
            href: "/loginpage",
            className: "login-reg-link"
        };
        this.registerLink = {
            tagName: 'a',
            innerText: "registration",
            href: "/registration",
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
        };
    }

    _createClass(WidgetUI, [{
        key: 'renderLoginLink',
        value: function renderLoginLink(events) {
            console.log("rendering login link");
            this.renderWidgetElement(this.loginLink, events);
            return this;
        }
    }, {
        key: 'renderRegisterLink',
        value: function renderRegisterLink(events) {
            console.log("rendering register link");
            this.renderWidgetElement(this.registerLink, events);
        }
    }, {
        key: 'renderSignoutButton',
        value: function renderSignoutButton(events) {
            this.renderWidgetElement(this.signOutButton, events);
        }
    }, {
        key: 'renderGreetings',
        value: function renderGreetings(userName) {
            this.greeting.innerText += userName;
            this.renderWidgetElement(this.greeting);
        }
    }, {
        key: 'cleanWidget',
        value: function cleanWidget() {
            console.log("cleaning");
            this.widgetContainer.innerHTML = "";
            return this;
        }
    }, {
        key: 'applyStyles',
        value: function applyStyles(styles) {
            var widgetStyles = document.createElement('style');
            widgetStyles.innerHTML = styles;
            document.head.appendChild(widgetStyles);
        }
    }, {
        key: 'renderWidgetElement',
        value: function renderWidgetElement(elementDescription, events) {
            _helpers2.default.renderElement(elementDescription, this.widgetContainer, events);
        }
    }]);

    return WidgetUI;
}();

exports.default = Widget;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _externalUser = __webpack_require__(5);

var _http = __webpack_require__(0);

var _http2 = _interopRequireDefault(_http);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _actionTypes = __webpack_require__(3);

var _settingsManager = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Facebook = function () {
    function Facebook() {
        _classCallCheck(this, Facebook);

        this.login = this.login.bind(this);
        var fbUI = new FacebookUI(this.login);

        var that = this;
        this.init(_settingsManager.Settings["FacebookApp"]);
        /*
        window.fbAsyncInit = function () {
              FB.init(Settings["FacebookApp"]);
        };
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        */
    }

    _createClass(Facebook, [{
        key: 'init',
        value: function init(params) {
            try {
                return Promise.resolve(FB.init(params));
            } catch (e) {
                return Promise.reject(e);
            }
        }
    }, {
        key: 'login',
        value: function login() {
            var that = this;
            console.log(that);
            FB.login(function (response) {
                if (response.authResponse) {
                    that.statusChangeCallback(response, true);
                }
            }, { scope: _settingsManager.Settings["FacebookScope"].join(',') });
        }
    }, {
        key: 'statusChangeCallback',
        value: function statusChangeCallback(response) {
            var _this = this;

            if (response.status === 'connected') {
                this.fetchUserInfo(_settingsManager.Settings["FacebookFields"].join(',')).then(function (_userData) {
                    var obj = { authRes: response, userData: _userData };
                    console.log(obj);
                    _this.sendUserData(obj);
                });
            };
        }
    }, {
        key: 'fetchUserInfo',
        value: function fetchUserInfo(fields) {
            return this.api('/me', { 'fields': fields });
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
        key: 'sendUserData',
        value: function sendUserData(loginData) {
            console.warn(loginData);
            if (loginData.userData != undefined) {

                var startDate = _helpers2.default.GetUTCMilliseconds();
                var expiresIn = loginData.authRes.authResponse.expiresIn;
                var endDate = startDate + expiresIn * 1000;

                var fbUser = new _externalUser.ExternalUser(loginData.userData.id, loginData.userData.name, loginData.userData.email, loginData.authRes.authResponse.accessToken, startDate, endDate, _actionTypes.actionTypes.facebook);

                var dataString = _helpers2.default.userDataStringFormer(_actionTypes.actionTypes.facebook, fbUser);

                _http2.default.post(_settingsManager.Settings["APIHost"] + '/login', dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (res) {
                    var redirectUrl = _helpers2.default.getRedirectUrl();
                    _helpers2.default.cookiesSetter(startDate, endDate, loginData.userData.name, res.userID, redirectUrl, res.jwtToken);

                    window.location = redirectUrl;
                }).catch(function (e) {
                    console.warn(e);
                });
            }
        }
    }]);

    return Facebook;
}();

exports.default = Facebook;

var FacebookUI = function () {
    function FacebookUI(clickHandler) {
        _classCallCheck(this, FacebookUI);

        this.facebookButtonTag = '<button type="button" id="fb" class="facebook-button">\n        <span class="fb-logo">\n            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216 216" class="fb-svg" color="#ffffff"><path fill="#ffffff" d="\n          M204.1 0H11.9C5.3 0 0 5.3 0 11.9v192.2c0 6.6 5.3 11.9 11.9\n          11.9h103.5v-83.6H87.2V99.8h28.1v-24c0-27.9 17-43.1 41.9-43.1\n          11.9 0 22.2.9 25.2 1.3v29.2h-17.3c-13.5 0-16.2 6.4-16.2\n          15.9v20.8h32.3l-4.2 32.6h-28V216h55c6.6 0 11.9-5.3\n          11.9-11.9V11.9C216 5.3 210.7 0 204.1 0z"></path></svg>\n          <!--img class="_5h0l img" src="https://www.facebook.com/rsrc.php/v3/y8/r/bDryHPcaXAf.png" alt="app-facebook" width="24" height="24"--></span>\n        Sign In with Facebook\n        </button>';
        this.facebookButton = "";
        var loginContainer = document.getElementById("login");
        if (loginContainer) {
            this.renderButton(loginContainer, clickHandler);
        } else {
            var regContainer = document.getElementById("registration");
            if (regContainer) {
                this.renderButton(regContainer, clickHandler);
            }
        }
    }

    _createClass(FacebookUI, [{
        key: 'renderButton',
        value: function renderButton(parentElement, clickHandler) {
            var socialButtonsContainer = document.createElement("div");
            socialButtonsContainer.innerHTML = this.facebookButtonTag;
            parentElement.appendChild(socialButtonsContainer);
            this.facebookButton = document.getElementById("fb");
            this.facebookButton.addEventListener("click", clickHandler);
        }
    }]);

    return FacebookUI;
}();

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _externalUser = __webpack_require__(5);

var _actionTypes = __webpack_require__(3);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _settingsManager = __webpack_require__(2);

var _http = __webpack_require__(0);

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Google = function () {
    function Google() {
        _classCallCheck(this, Google);

        this.login = this.login.bind(this);
        this.isSignedIn = this.isSignedIn.bind(this);
        this.initG = this.initG.bind(this);
        this.loginSteps = this.loginSteps.bind(this);
        this.refresher = this.refresher.bind(this);
        this.googleUI = new GoogleUI(this.login);

        this.connect(this.initG);
    }

    _createClass(Google, [{
        key: 'loadGoogleScript',
        value: function loadGoogleScript(file) {
            var jsElm = document.createElement("script");
            jsElm.type = "application/javascript";
            jsElm.src = file;
            document.head.appendChild(jsElm);
        }
    }, {
        key: 'connect',
        value: function connect(connectCallBack) {
            gapi.load('auth2', connectCallBack);
        }
    }, {
        key: 'initG',
        value: function initG() {
            gapi.auth2.init(_settingsManager.Settings["GoogleApp"]);
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
                scope: _settingsManager.Settings["GoogleScope"].join(' ')
            }).then(function (res) {
                that.getUserData(res);
            });
        }
    }, {
        key: 'isSignedIn',
        value: function isSignedIn() {
            return gapi.auth2.getAuthInstance().isSignedIn.get();
        }
    }, {
        key: 'signOut',
        value: function signOut() {

            gapi.auth2.getAuthInstance().signOut();
        }
    }, {
        key: 'getUserData',
        value: function getUserData(googleUser) {
            if (googleUser.El != null) {

                var profile = googleUser.getBasicProfile();
                var authResp = googleUser.getAuthResponse();
                var startDate = _helpers2.default.GetUTCMilliseconds();
                var expiresIn = authResp.expires_in;

                var endDate = startDate + expiresIn * 1000;
                var gu = new _externalUser.ExternalUser(profile.getId(), profile.getName(), profile.getEmail(), authResp.id_token, startDate, endDate, _actionTypes.actionTypes.google);
                var redirectUrl = _helpers2.default.getRedirectUrl();
                var dataString = _helpers2.default.userDataStringFormer(_actionTypes.actionTypes.google, gu);

                _http2.default.post(_settingsManager.Settings["APIHost"] + '/login', dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (res) {
                    if (res) {
                        _helpers2.default.cookiesSetter(startDate, endDate, gu.userName, "123", redirectUrl, res.jwtToken);
                        console.log(res);
                        window.location = redirectUrl;
                    }
                }).catch(function (e) {
                    console.error(e);
                });
            }
        }
    }]);

    return Google;
}();

exports.default = Google;

var GoogleUI = function () {
    function GoogleUI(clickHandler) {
        _classCallCheck(this, GoogleUI);

        this.googleButtonTag = '<button type="button" id="g" class="google-button">\n        <span class="g-logo">\n                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 48 48" class="g-svg"><g><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z">\n            </path><path fill="none" d="M0 0h48v48H0z"></path></g></svg>\n        </span>\n        Sign In with Google</button>';
        this.googleButton = "";
        var loginContainer = document.getElementById("login");
        if (loginContainer) {
            this.renderButton(loginContainer, clickHandler);
        } else {
            var regContainer = document.getElementById("registration");
            if (regContainer) {
                this.renderButton(regContainer, clickHandler);
            }
        }
    }

    _createClass(GoogleUI, [{
        key: 'renderButton',
        value: function renderButton(parentElement, clickHandler) {
            var socialButtonsContainer = document.createElement("div");
            socialButtonsContainer.innerHTML = this.googleButtonTag;
            parentElement.appendChild(socialButtonsContainer);
            this.googleButton = document.getElementById("g");
            this.googleButton.addEventListener("click", clickHandler);
            console.log(this.googleButton);
        }
    }]);

    return GoogleUI;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _actionTypes = __webpack_require__(3);

var _http = __webpack_require__(0);

var _http2 = _interopRequireDefault(_http);

var _settingsManager = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Login = function () {
    function Login() {
        _classCallCheck(this, Login);

        this.loginUI = new LoginUI();
        if (this.loginUI.loginFormContainer) {
            this.loginUI.renderLoginForm(this.submit, this.forgotPasswordFormSubmit);
        }
    }

    _createClass(Login, [{
        key: 'forgotPasswordFormSubmit',
        value: function forgotPasswordFormSubmit(e) {
            e.preventDefault();

            var email = this.elements.emailForgot.value;
            _http2.default.post(_settingsManager.Settings["APIHost"] + '/sendEmail', "email=" + email, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (res) {
                console.warn(res);
            }).catch(function (e) {
                console.warn(e);
            });
        }
    }, {
        key: 'submit',
        value: function submit(e) {
            e.preventDefault();
            var form = document.getElementById("loginForm");
            if (_helpers2.default.emailValidator(null, form.elements.email) & _helpers2.default.passwordValidator(null, form.elements.password)) {

                var startDate = _helpers2.default.GetUTCMilliseconds();

                var objToSend = {
                    email: form.elements.email.value,
                    password: form.elements.password.value,
                    startDate: startDate
                };

                var dataString = _helpers2.default.userDataStringFormer(_actionTypes.actionTypes.login, objToSend);
                var redirectUrl = _helpers2.default.getRedirectUrl();
                _http2.default.post(_settingsManager.Settings["APIHost"] + '/login', dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (res) {

                    _helpers2.default.cookiesSetter(startDate, startDate + res.expires_in * 1000, res.userName === undefined ? "User" : res.userName, "123", redirectUrl, res.jwtToken);
                    window.location = redirectUrl;
                }).catch(function (e) {
                    var errorContainer = document.getElementById('server-error');
                    errorContainer.innerText = e;
                });
            } else return;
        }
    }]);

    return Login;
}();

exports.default = Login;

var LoginUI = function () {
    function LoginUI() {
        _classCallCheck(this, LoginUI);

        this.loginFormContainer = document.getElementById("login");

        this.loginFormFields = [{
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

    _createClass(LoginUI, [{
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
        key: 'renderForgotForm',
        value: function renderForgotForm(parent, submitForm) {

            var forgotPasswordForm = document.createElement("form");
            forgotPasswordForm.name = "forgotPassword";
            for (var key in this.forgotForm) {
                forgotPasswordForm[key] = this.forgotForm[key];
            }
            var newThis = this;
            this.forgotFormFields.forEach(function (item, i, arr) {
                var element = document.createElement(item.tagName);
                for (var _key in item) {
                    if (_key != 'tagName') {
                        element[_key] = item[_key];
                    }
                }
                forgotPasswordForm.appendChild(element);
            });
            forgotPasswordForm.addEventListener('submit', submitForm);
            parent.appendChild(forgotPasswordForm);
        }
    }, {
        key: 'renderLoginForm',
        value: function renderLoginForm(loginSubmit, forgotPasswordSubmit) {
            var _this = this;

            var form = document.createElement('form');
            form.name = "loginForm";
            form.id = "loginForm";
            form.addEventListener('submit', loginSubmit);

            var newThis = this;
            this.loginFormFields.forEach(function (item) {
                var events = {};
                if (item.type == "password") {
                    events = {
                        "blur": _helpers2.default.passwordValidator,
                        "focus": _helpers2.default.removeError
                    };
                }
                if (item.type == "email") {
                    events = {
                        "blur": _helpers2.default.emailValidator,
                        "focus": _helpers2.default.removeError
                    };
                }
                if (item.id == "toggleForgot") {
                    events = {
                        "click": _this.toggleForgotForm
                    };
                }
                _helpers2.default.renderElement(item, form, events);
            });
            var serverError = document.createElement("div");
            serverError.className = 'form-error';
            serverError.id = 'server-error';
            form.appendChild(serverError);
            this.loginFormContainer.appendChild(form);
            this.renderForgotForm(this.loginFormContainer, forgotPasswordSubmit);
        }
    }]);

    return LoginUI;
}();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _actionTypes = __webpack_require__(3);

var _http = __webpack_require__(0);

var _http2 = _interopRequireDefault(_http);

var _settingsManager = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Registration = function () {
    function Registration() {
        _classCallCheck(this, Registration);

        this.loginUI = new RegistrationUI();
        console.log(this.loginUI);
        if (this.loginUI.loginFormContainer) {
            this.loginUI.renderRegForm(this.submit);
        }
    }

    _createClass(Registration, [{
        key: 'submit',
        value: function submit(e) {
            e.preventDefault();
            if (_helpers2.default.emailValidator(null, this.elements.email) & _helpers2.default.passwordValidator(null, this.elements.password) & _helpers2.default.isNotEmpty(this.elements.name.value)) {
                var userName = this.elements.name.value;

                var _userName$split = userName.split(' '),
                    _userName$split2 = _slicedToArray(_userName$split, 2),
                    firstName = _userName$split2[0],
                    lastName = _userName$split2[1];

                var objToSend = {
                    email: this.elements.email.value,
                    password: this.elements.password.value,
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    registrationIP: _settingsManager.IP
                };
                var dataString = _helpers2.default.userDataStringFormer(_actionTypes.actionTypes.register, objToSend);
                console.log(objToSend);

                _http2.default.post(_settingsManager.Settings["APIHost"] + '/register', dataString, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (res) {

                    window.location = _settingsManager.Settings["RegistrationRedirect"];
                }).catch(function (e) {
                    var errorContainer = document.getElementById('server-error');
                    errorContainer.innerText = e;
                });
            } else return;
        }
    }]);

    return Registration;
}();

exports.default = Registration;

var RegistrationUI = function () {
    function RegistrationUI() {
        _classCallCheck(this, RegistrationUI);

        this.loginFormContainer = document.getElementById("registration");
        this.regFormFields = [{
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
    }

    _createClass(RegistrationUI, [{
        key: 'renderRegForm',
        value: function renderRegForm(regSubmit) {
            var form = document.createElement('form');
            form.name = "regForm";
            form.addEventListener('submit', regSubmit);

            var newThis = this;
            this.regFormFields.forEach(function (item) {
                var events = {};
                if (item.type == "password") {
                    events = {
                        "blur": _helpers2.default.passwordValidator,
                        "focus": _helpers2.default.removeError
                    };
                }
                if (item.type == "email") {
                    events = {
                        "blur": _helpers2.default.emailValidator,
                        "focus": _helpers2.default.removeError
                    };
                }
                _helpers2.default.renderElement(item, form, events);
            });
            var serverError = document.createElement("div");
            serverError.className = 'form-error';
            serverError.id = 'server-error';
            form.appendChild(serverError);
            this.loginFormContainer.appendChild(form);
        }
    }]);

    return RegistrationUI;
}();

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _http = __webpack_require__(0);

var _http2 = _interopRequireDefault(_http);

var _helpers = __webpack_require__(1);

var _helpers2 = _interopRequireDefault(_helpers);

var _settingsManager = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RestorePassword = function () {
    function RestorePassword() {
        _classCallCheck(this, RestorePassword);

        this.restoreUI = new RestorePasswordUI();
        this.restoreUI.renderRestoreForm(this.restoreFormSubmit);

        this.restorePasswordSubmit = this.restoreFormSubmit.bind(this);
    }

    _createClass(RestorePassword, [{
        key: 'restoreFormSubmit',
        value: function restoreFormSubmit(e) {
            e.preventDefault();
            var form = document.getElementById("restorePasswordForm");

            if (_helpers2.default.passwordValidator(null, form.elements.password) & _helpers2.default.passwordValidator(null, form.elements.passwordRepeat)) {
                _http2.default.post(_settingsManager.Settings["APIHost"] + '/resetPassword', "email=mariiachdev@gmail.com" + "&password=" + form.elements.password.value, { 'Content-Type': 'application/x-www-form-urlencoded' }).then(function (res) {
                    window.location = _settingsManager.Settings["RegistrationRedirect"];
                }).catch(function (e) {
                    var errorContainer = document.getElementById('server-error');
                    errorContainer.innerText = e;
                });
            }
        }
    }]);

    return RestorePassword;
}();

exports.default = RestorePassword;

var RestorePasswordUI = function () {
    function RestorePasswordUI() {
        _classCallCheck(this, RestorePasswordUI);

        this.restorePasswordContainer = document.getElementById("restore-password");
        this.restoreFormFields = [{
            tagName: 'input',
            type: 'password',
            name: 'password',
            placeholder: "enter your password",
            className: "login-reg-input"
        }, {
            tagName: 'input',
            type: 'password',
            name: 'passwordRepeat',
            placeholder: "repeat password",
            className: "login-reg-input"
        }, {
            tagName: 'button',
            type: 'submit',
            innerText: "Save password",
            className: "login-reg-button"
        }];
    }

    _createClass(RestorePasswordUI, [{
        key: 'renderRestoreForm',
        value: function renderRestoreForm(restorePasswordSubmit) {
            if (!this.restorePasswordContainer) return;
            var form = document.createElement('form');
            form.name = "restorePasswordForm";
            form.id = "restorePasswordForm";
            form.addEventListener('submit', restorePasswordSubmit);

            var newThis = this;
            this.restoreFormFields.forEach(function (item) {
                var events = {};
                if (item.type == "password") {
                    events = {
                        "blur": _helpers2.default.passwordValidator,
                        "focus": _helpers2.default.removeError
                    };
                }

                _helpers2.default.renderElement(item, form, events);
            });
            var serverError = document.createElement("div");
            serverError.className = 'form-error';
            serverError.id = 'server-error';
            form.appendChild(serverError);
            this.restorePasswordContainer.appendChild(form);
        }
    }]);

    return RestorePasswordUI;
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var widgetStyles = "\n            .visible{\n                display: block;\n\n            }\n            .hidden{\n                display: none;\n            }\n            .login-reg-link{\n\n                display: inline-block; \n                margin-right: 10px; \n                width: 100px; text-align:center; \n                display: inline-block;\n                position: relative;\n                padding: .61538462em 1em;\n                vertical-align: middle;\n                min-height: 2.46153846em;\n                box-sizing: border-box;\n                font-weight: 400;\n                font-family: inherit;\n                line-height: 1;\n                text-align: center;\n                text-decoration: none;\n                background-color: transparent;\n                border-radius: 2px;\n                border: 1px solid transparent;\n                cursor: pointer;\n                outline: none;\n                touch-action: manipulation;\n                transition: all .1s ease-in;\n                text-decoration: none; \n                padding: 6px 12px;\n                transition: 0.3s ease-in-out;\n                color: #07C;\n                background-color: rgba(0,119,204,0);\n                border-color: transparent;\n                box-shadow: none;\n            }\n            .login-reg-link:hover{\n                    color: #005999;\n                    background-color: rgba(0,119,204,0.1);\n                    border-color: transparent;\n                    box-shadow: none;\n            }\n            .forgot-password-link{\n                    position: relative;\n                    top: -8px;\n                    color: #9fa6ad;\n                    font-size: 11px;\n                    font-weight: normal;\n                    cursor: pointer;\n                    text-align: right;\n            }\n            .forgot-password-link:hover{\n                color: #000;\n            }\n\n            .login-reg-button{\n                text-align: center;\n                background: #07C;\n                color: #FFF;\n                border-radius: 3px;\n                width: 100%;\n                padding: 12px;\n                box-shadow: none;\n                text-shadow: none;\n                text-decoration: none;\n                border: none;\n                cursor: pointer;\n                margin-bottom: 0 !important;\n            }\n            .reg{\n                    color: #FFF;\n    background-color: #0095ff;\n    border-color: #07c;\n    box-shadow: inset 0 1px 0 #66bfff;\n            }\n.reg:hover{\n        color: rgba(255,255,255,0.9);\n    background-color: #07c;\n    border-color: #005999;\n    box-shadow: inset 0 1px 0 #3af;\n}\n            .login-reg-form{\n    width: 280px;\n    margin: 0 auto;\n    padding: 30px;\n    border: 1px solid #e4e6e8;\n    background: #FFF;\n}\n.login-reg-input{    width: 100%;\n    line-height: 1.3;\n    font-size: 100%;\n    padding: 8px;\n    margin-bottom: 10px;\n    \n    border: 1px solid #e4e6e8;\n    border-radius: 0;\n    cursor: auto !important;\n}\n.login-reg-input:hover, .login-reg-input:focus\n{\n        border: 1px solid lightblue !important;\n}\n    .form-error{\n        color: red;\n    }\nbutton {\n    height: auto;\n    border: none;\n    margin-bottom: 10px;\n    cursor: pointer;\n    &:focus {\n        outline: none;\n    }\n    &[disabled] {\n        cursor: default;\n    }\n}\n.facebook-button{\n    background-color: #4267b2;\n    font-family: Helvetica, Arial, sans-serif;\n    color: #fff;\n    border: none;\n    height: 40px;\n    letter-spacing: .25px;\n    font-size: 14px;\n    border-radius: 2px;\n    overflow: hidden;\n    text-align: center;\n    text-overflow: clip;\n    white-space: nowrap;\n    vertical-align: middle;\n    position: relative;\n    width: 100%;\n\n    \n}\n.fb-logo{\n        width: 40px;\n        height: 40px;\n        display: block;\n        position: absolute;\n        left: 0px;\n        top: 3px;\n        padding-top: 6px;\n    }\n    .fb-svg{\n        width: 24px;\n        height: 24px;\n\n    }\n.google-button{\n    background-color: #4285f4;\n    font-family: Roboto,arial,sans-serif;\n    color: #fff;\n    height: 40px;\n    width: 100%;\n    font-weight: 500;\n    letter-spacing: .21px;\n    vertical-align: top;\n    font-size: 14px;\n    position: relative;\n}\n.g-logo{\n        background-color: #fff;\n        width: 24px;\n        height:24px;\n        position:  absolute;\n        left: 9px;\n        top:8px;\n\n    }\n    .g-svg{\n        margin-top: 3px;\n    }\n\n\n\n\n        ";
exports.widgetStyles = widgetStyles;

/***/ })
/******/ ]);
});