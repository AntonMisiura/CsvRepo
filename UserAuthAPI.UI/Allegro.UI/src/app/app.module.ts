import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserService } from './user/user.service';
import { GoogleService } from './user/google/google.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {Routing} from './app.routing';
import { OfficeComponent } from './office/office.component';
import {ActivateIfLoggedInGuard} from './guards/activate-if-logged-in.guard';
import {DontActivateIfLoggedInGuard} from './guards/dont-activate-if-logged-in.guard';
import { FacebookService } from './user/facebook/facebook.service';
import { ForgotPasswordComponent } from './user/login/forgot-password/forgot-password.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NotFoundComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    OfficeComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    Routing,
    ReactiveFormsModule,
    HttpModule, 
  ],
  providers:  [{provide: LocationStrategy, useClass: HashLocationStrategy}, CookieService, 
                  UserService, DontActivateIfLoggedInGuard, ActivateIfLoggedInGuard, GoogleService, FacebookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
