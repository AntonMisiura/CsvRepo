import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { Router } from '@angular/router';
import { CustomValidatorsService } from '../../general-services/custom-validators.service'
import { UserService } from '../user.service'

@Component({
  selector: 'allegro-register',
  templateUrl: './register.component.html',
  providers: [UserService, CustomValidatorsService]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  emailValid: boolean = false;
  loginPristine: boolean = true;
  loginLength: boolean = false;
  passwordMatched: boolean = true;
  passwordPristine: boolean = true;

  repeatPristine: boolean = true;
  passwordsMatched: boolean = false;

  constructor(private userService: UserService,
    private router: Router,
    private customValidatorsService: CustomValidatorsService) {
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.required, this.customValidatorsService.emailPatternValidator]),
      'name': new FormControl('', [Validators.required]),
      'passwords': new FormArray([
        new FormControl('', [Validators.required, this.customValidatorsService.passwordValidator]),
        new FormControl('', Validators.required),

      ], this.customValidatorsService.matchValidator)
    });

    this.registerForm.controls['email'].statusChanges.subscribe((data) => {
      this.loginPristine = this.registerForm.controls['email'].pristine;
      (this.registerForm.hasError('emailInvalid', ['email'])) ? this.emailValid = false : this.emailValid = true;
    });


    (<FormArray>this.registerForm.controls['passwords']).controls[0].valueChanges.subscribe((data) => {
      this.passwordPristine = (<FormArray>this.registerForm.controls['passwords']).controls[0].pristine;
      ((<FormArray>this.registerForm.controls['passwords']).hasError('patternNotMatched', ["0"])) ? this.passwordMatched = false : this.passwordMatched = true;
      (this.registerForm.hasError('passwordsDontMatch', ['passwords'])) ? this.passwordsMatched = false : this.passwordsMatched = true;

    });
    (<FormArray>this.registerForm.controls['passwords']).valueChanges.subscribe((data) => {
      this.repeatPristine = (<FormArray>this.registerForm.controls['passwords']).controls[1].pristine;
      (this.registerForm.hasError('passwordsDontMatch', ['passwords'])) ? this.passwordsMatched = false : this.passwordsMatched = true;
    })

  }
  register() {
    let objToSend = {
      email: this.registerForm.controls['email'].value,
      name: this.registerForm.controls['name'].value,
      password: (<FormArray>this.registerForm.controls['passwords']).controls[0].value,
      repeatPassword: (<FormArray>this.registerForm.controls['passwords']).controls[1].value,
    };
    this.userService.signUp(objToSend);
  }
  ngOnInit() {
  }

}
