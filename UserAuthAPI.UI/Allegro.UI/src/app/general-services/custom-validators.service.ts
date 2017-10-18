import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
@Injectable()
export class CustomValidatorsService {

  constructor() { }
   emailPatternValidator(control: FormControl) {
    if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(control.value)) {
      return null;
    }
    else {
      return {
        emailInvalid: true

      };
    }
  }
  passwordValidator(control: FormControl) {
    if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/.test(control.value)) {
      return null;
    }
    else {
      return {
        patternNotMatched: true

      };
    }
  }
  matchValidator(controlArr: FormArray) {
    if (controlArr.controls[0].value === controlArr.controls[1].value) {
      return null;
    }
    else {
      return {
        passwordsDontMatch: true
      };
    }
  }

}
