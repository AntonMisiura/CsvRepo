import { Injectable } from '@angular/core';
declare const gapi: any;
@Injectable()
export class GoogleService {
  appSettings: GoogleAppSettings;
  googleAuth: any;
  googleUser: any;

  constructor() {
    this.getGoogleAuth = this.getGoogleAuth.bind(this);
    this.isSignedIn = this.isSignedIn.bind(this);
    this.appSettings = {
       client_id: '27904284775-6riklo3mi99rumcvfmjmi9e8kgluqhuu.apps.googleusercontent.com',
       cookiepolicy: 'single_host_origin',
       scope: 'profile email',
       ux_mode: 'popup',
       redirect_uri: 'http://localhost:4200'
    }
  }
  getGoogleAuth(auth) {
    this.googleAuth = auth;
  }

  isLoggedIn = (val) => { };
  getUserData = (googleUser) => { }

  connect() {
    gapi.load('auth2', () => {
      let auth2 = gapi.auth2.init(this.appSettings).then(googleAuth => {
        this.getGoogleAuth(googleAuth);
      });
    });
  }
  fetchUser(){
    if(this.googleAuth && this.googleAuth.currentUser){
      this.getUserData(this.googleAuth.currentUser.get())
    }
  }
  signIn() {
    this.googleAuth.signIn({
      scope: 'profile email'
    }).then((res) => {
      this.getUserData(res);
    })
  }
  isSignedIn() {
    return this.googleAuth.isSignedIn.get();
  }
  signOut() {
    this.googleAuth.signOut().then(function (user) {
      console.log('User signed out.');

    });
  }
}
interface GoogleAppSettings{
    client_id: string,
    cookiepolicy: string,
    scope: string,
    ux_mode: string,
    redirect_uri: string
}