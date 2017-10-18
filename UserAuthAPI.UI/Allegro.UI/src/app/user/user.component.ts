import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service'
declare const gapi: any;
@Component({
  selector: 'allegro-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) {}
  loginToFB(){
    this.userService.loginToFB();
  }
 
  loginToG(){
    this.userService.loginToG();
  }
  ngOnInit() {
 
}}
