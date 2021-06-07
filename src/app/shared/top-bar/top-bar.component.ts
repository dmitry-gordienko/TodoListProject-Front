import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../../core/auth/authorization.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit{

  private isLoggedIn:boolean = false;

  constructor(
    public readonly authService: AuthorizationService
  ) { }
  
  logout()
  {
    console.log('Logout top-bar button');  
    this.authService.logout();
  }

  ngOnInit(){
    if(this.authService.isAuthorized)
      this.isLoggedIn = true;
    console.log('Logged in: ', this.isLoggedIn);
  }



}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/