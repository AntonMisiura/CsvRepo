import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {UserService} from '../user.service';
import { CustomValidatorsService } from '../../general-services/custom-validators.service';
import {Router} from '@angular/router';
@Component({
  selector: 'allegro-login',
  templateUrl: './login.component.html',
  providers: [CustomValidatorsService]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  emailValid: boolean;
  loginPristine: boolean;
  forgotPasswordVisible: boolean;
  constructor(private userService: UserService, 
  private route: Router, private customValidatorsService: CustomValidatorsService) {
    this.loginForm = new FormGroup({
      'login': new FormControl('',[Validators.required,  this.customValidatorsService.emailPatternValidator]),
      'password': new FormControl('', Validators.required)
    });
    this.loginForm.controls['login'].statusChanges.subscribe((data) => {
            this.loginPristine = this.loginForm.controls['login'].pristine;
            (this.loginForm.hasError('emailInvalid', ['login'])) ? this.emailValid = false : this.emailValid = true;
    });
    this.emailValid = false;
    this.loginPristine = true;
    this.forgotPasswordVisible = false;
  }
  ngOnInit() {
  }
  onSubmit(){
        let loginObj = {
          'email': this.loginForm.controls['login'].value,
          'password': this.loginForm.controls['password'].value
        }
        this.userService.logIn(loginObj);
  }
  showForgotPasswordForm(){
    this.forgotPasswordVisible = true;
  }

}
