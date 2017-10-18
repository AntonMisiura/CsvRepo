import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from '../../user.service'
import { CustomValidatorsService } from '../../../general-services/custom-validators.service'
@Component({
  selector: 'allegro-forgot-password',
  templateUrl: './forgot-password.component.html'

})
export class ForgotPasswordComponent implements OnInit {

   emailValid: boolean = false;
  emailPristine: boolean = true;
  forgotPasswordForm: FormGroup;

  constructor(private userService: UserService, private customValidatorsService: CustomValidatorsService) {
    this.forgotPasswordForm = new FormGroup({
                          'email': new FormControl('', [Validators.required, this.customValidatorsService.emailPatternValidator])});

    this.forgotPasswordForm.controls['email'].statusChanges.subscribe((data) => {
            this.emailPristine = this.forgotPasswordForm.controls['email'].pristine;
            (this.forgotPasswordForm.hasError('emailInvalid', ['email'])) ? this.emailValid = false : this.emailValid = true;
      });
   }

  ngOnInit() {
  }
  
  onSubmit(){
    let email = {
      'email': this.forgotPasswordForm.controls['email'].value
    }
    this.userService.getRestorePasswordLink(email).subscribe((res)=>{});
  }

}
