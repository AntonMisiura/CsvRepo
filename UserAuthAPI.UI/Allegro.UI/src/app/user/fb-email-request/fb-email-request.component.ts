import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import {UserService} from '../user.service';
import { CustomValidatorsService } from '../../general-services/custom-validators.service';
import {Router} from '@angular/router';
@Component({
  selector: 'allegro-fb-email-request',
  templateUrl: './fb-email-request.component.html'
})
export class FbEmailRequestComponent implements OnInit {

  facebookRequest: FormGroup;
  emailValid: boolean;
  loginPristine: boolean;
  @Output() onEmailAdd = new EventEmitter<any>();
  @Input() fbUser: any;
  constructor(private userService: UserService, 
  private route: Router, private customValidatorsService: CustomValidatorsService) {
    this.facebookRequest = new FormGroup({
      'email': new FormControl('',[Validators.required,  this.customValidatorsService.emailPatternValidator]),
    });
    this.facebookRequest.controls['email'].statusChanges.subscribe((data) => {
            this.loginPristine = this.facebookRequest.controls['email'].pristine;
            (this.facebookRequest.hasError('emailInvalid', ['email'])) ? this.emailValid = false : this.emailValid = true;
    });
    this.emailValid = false;
    this.loginPristine = true;
  
  }
  
  ngOnInit() {
  }
  
  onSubmit(){
      this.fbUser.userData.email = this.facebookRequest.controls['email'].value
      this.onEmailAdd.emit(this.fbUser);
  }

}
