import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalVars } from '../shared/global-vars';
import { Observable, BehaviorSubject } from 'rxjs';
import { Headers } from '@angular/http';
import { RequestOptions } from '@angular/http';
import { CookieService } from 'angular2-cookie/core';
import { Router } from '@angular/router';
import { UserModels } from './user.models';
import { HttpMethods } from '../general-models/general-enums';
import { GoogleService } from './google/google.service';
import { FacebookService } from './facebook/facebook.service';
@Injectable()
export class UserService {

  user: UserModels.User;
  public authenticated = new BehaviorSubject(null);

  constructor(private http: Http, private cookieService: CookieService,
    private router: Router, private googleService: GoogleService,
    private facebookService: FacebookService) {
    this.googleService.getUserData = this.googleRetrieveInformation.bind(this);
    this.facebookService.getUserData = this.facebookRetrieveInfo.bind(this);
    this.user = new UserModels.User();
    
  }

  loginToFB() {
    this.facebookService.login();
  }

  logOutFromFB() {
    this.facebookService.logout();
  }

  facebookRetrieveInfo(loginData, fromLogin) {
    console.log(loginData)
    if (loginData.userData != undefined) {
      let fbUser = new UserModels.ExternalUser(loginData.userData.id, loginData.userData.name,
        loginData.userData.email, loginData.authRes.authResponse.accessToken, UserModels.LoginTypes.facebook);
       
       /* 
      this.putAuthInfoToCookies({userName: fbUser.name, JWTtoken: "123", email: fbUser.email});
      this.changeUserStatus();
          if (fromLogin) {
            this.router.navigate(['/office']);
      }*/
      
    let data = this.userDataStringFormer(UserModels.LoginTypes.facebook, fbUser);
       console.log(data)
       this.userInfoPost(data).subscribe((userData)=>{
          this.putAuthInfoToCookies(new UserModels.User(fbUser.name, userData.jwtToken, fbUser.email));
          this.changeUserStatus();
          if (fromLogin) {
            this.router.navigate(['/office']);
          }
      }, (error)=>{console.log(error)});
    }
  }

  loginToG() {
    this.googleService.signIn();
  }

  googleRetrieveInformation(googleUser) {
    if (googleUser.El != null) {
     
      let profile = googleUser.getBasicProfile();
      let authResp = googleUser.getAuthResponse();
      let gu = new UserModels.ExternalUser(profile.getId(), profile.getName(), profile.getEmail(), authResp.id_token, UserModels.LoginTypes.google);
      let data = this.userDataStringFormer(UserModels.LoginTypes.google, gu);
      
      /*
      this.putAuthInfoToCookies(new UserModels.User(gu.name, "123", gu.email));
      this.changeUserStatus();
      this.router.navigate(['/office']);
      */

      this.userInfoPost(data).subscribe((userData)=>{
          this.putAuthInfoToCookies(new UserModels.User(gu.name, userData.jwtToken, gu.email));
          this.changeUserStatus();
          
          this.router.navigate(['/office']);
         
      }, (error)=>{console.log(error)});
    }
  }
  userInfoPost(data, url=GlobalVars.apiHost+'/token'): Observable<UserModels.LoginResponse>{
    let options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }) });
    return this.http.post(url, data, options).map(response => { 
      let userData = <UserModels.LoginResponse>response.json();
      return userData;
     });
  }
  changeUserStatus() {
    let authObj = <UserModels.User>this.cookieService.getObject('authorizationData');
    if (authObj && authObj.jwtToken) {
      this.user.userName = authObj.userName;
      this.user.isLoggedIn = true;
      this.user.jwtToken = authObj.jwtToken;
      this.user.email = authObj.email;
    }
    else {
      this.user = new UserModels.User();
      this.user.isLoggedIn = false;
    }
     console.warn(this.user)
    this.authenticated.next(this.user)
    return this.user;
  }
  

  userDataStringFormer(loginType, loginObj){
    return "loginType=" + loginType + "&logindata=" + JSON.stringify(loginObj);
  }
  logIn(loginObj) {
   
    let data = this.userDataStringFormer(UserModels.LoginTypes.login, loginObj);
     console.log(data)
    this.userInfoPost(data, GlobalVars.apiHost+'/login').subscribe((userData)=>{
          this.putAuthInfoToCookies(new UserModels.User(userData.userName, userData.jwtToken, loginObj.email));
          this.changeUserStatus();
          this.router.navigate(['/office']);
          console.log(userData)
      }, (error)=>{console.log(error)});

  }
  signUp(regForm) {
  
    let data = this.userDataStringFormer(UserModels.LoginTypes.register, regForm);
    
     this.userInfoPost(data).subscribe((userData)=>{
          this.router.navigate(['/user/login']);
      }, (error)=>{console.log(error)});
  }
  getRestorePasswordLink(restoreObject) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(GlobalVars.apiBase + '/restorelink', JSON.stringify(restoreObject), options).map(res => { res.text() })
  }
  putAuthInfoToCookies(cookiesObj: UserModels.User) {
    this.cookieService.putObject('authorizationData', cookiesObj);
  }
  isLoggedIn() {
    let authObj = <UserModels.User>this.cookieService.getObject('authorizationData');
    if (authObj && authObj.jwtToken) {
      this.user.userName = authObj.userName;
      return true;
    };
    return false;
  }

  init() {
    this.googleService.connect();
    this.facebookService.connect();
  }
  logOut() {
    this.cookieService.remove('authorizationData');
    if (this.googleService.isSignedIn()) {
      this.googleService.signOut();
    }
    this.facebookService.isSignedIn().then((res) => {
      if (res) {
        this.facebookService.logout();
      }
    });
    this.changeUserStatus();
    this.router.navigate(['/mainpage']);
  }

}
