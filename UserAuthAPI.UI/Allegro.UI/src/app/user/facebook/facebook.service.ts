import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/add/operator/map';

import { FacebookModels as FBModels } from './facebook.models'
declare var FB: any;
export type ApiMethod = 'get' | 'post' | 'delete';
@Injectable()
export class FacebookService {
  scope: string;
  fields: string;
  appSettings: FBModels.FacebookAppSettings;
  isLoggedIn: boolean;
  constructor() {
    this.getLoginStatus = this.getLoginStatus.bind(this);
    this.scope = ['public_profile','email'].join(',');
    this.fields = ['name', 'email'].join(',');
    this.isLoggedIn = false;
    this.appSettings = {
      appId: '720460194825623',
      cookie: true,
      xfbml: true,
      version: 'v2.8'
    }
  }
  connect() {
    this.init(this.appSettings).then((res) => {});
  }
  getUserData = (facebookUser, fromLogin) => { }

  init(params: FBModels.FacebookAppSettings): Promise<any> {
    try {
      return Promise.resolve(FB.init(params));
    } catch (e) {
      return Promise.reject(e);
    }
  }
  getLoginStatus() {
    FB.getLoginStatus((response) => {
      this.statusChangeCallback(response, false);
    });
  }
  statusChangeCallback(response: FBModels.AuthResponseObj, fromLogin: boolean) {
    if (response.status === FBModels.LoginStatuses.connected) {
    
      this.fetchUserInfo(this.fields).then((_userData) => {
        var obj = { authRes: response, userData: _userData }
        this.getUserData(obj, fromLogin);
      });

    }
  }
  login() {
    
    FB.login((response: FBModels.AuthResponseObj) => {
 
      if (response.authResponse) {
        this.statusChangeCallback(response, true)
      }
    },{scope: this.scope})
  }
  isSignedIn() {
    return new Promise<boolean>((resolve, reject) => {
      FB.getLoginStatus((response: FBModels.AuthResponseObj) => {
        if (response.status === 'connected') {
          resolve(true)
        }
        else {
          resolve(false)
        }
      });
    })
  }
  logout() {
    FB.logout((response: any) => {
      console.log(response);
    });
  }
  fetchUserInfo(fields) {
    return this.api('/me', { 'fields': fields });
  }
  api(url: string, params?) {
    return new Promise<any>((resolve, reject) => {
      try {
        FB.api(url, params, (response) => {
          resolve(response)
        })
      }
      catch (e) {
        reject(e);
      }
    })
  }



}
