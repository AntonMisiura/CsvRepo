import { Component, OnInit, DoCheck, AfterViewInit, NgZone } from '@angular/core';
import {UserService} from './user/user.service';
import {UserModels} from './user/user.models';
@Component({
  selector: 'allegro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, DoCheck, AfterViewInit {
  title = 'allegro';
  appUser: UserModels.User;
  isLoggedIn: boolean = false;

  constructor(private userService:UserService, private zone: NgZone) {

  this.appUser = new UserModels.User();
  this.userService.authenticated.subscribe((value)=>{
    if(value != null){
      this.zone.run(()=>{
          this.appUser = value;
          this.isLoggedIn = value.isLoggedIn;
      })
    }
  });
  }
  ngOnInit(){
      this.appUser = this.userService.changeUserStatus();
  }
  ngAfterViewInit(){
    this.userService.init();
    
    
  }
  ngDoCheck(){
  }
  logOut(){
    this.userService.logOut();
  }

  getUser(user){
      this.appUser = user;
      
  }
  

}
