import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserFullModel } from 'src/app/core/user/models/user-full.model';
import { AuthorizationService } from '../../core/auth/authorization.service';
import { UserService } from "../../core/user/user.service";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  private isLoggedIn: boolean = false;
  //@Input() avatarUrl?: string;

  //@Input() itemsList?: ITodoItem[];

  //user$: Observable<IUserFullModel>;
  user?: IUserFullModel;

  constructor(
    public readonly authService: AuthorizationService,
    public readonly userService: UserService
  ) { }

  logout() {
    console.log('Logout top-bar button');
    this.authService.logout();
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthorized;
    this.user = this.userService.currentUser;
    //this.user$ = this.userService.userChange;
    //this.avatarUrl = this.userService.avatarLink;
    console.log('Logged in: ', this.isLoggedIn);
    //console.log('Avatar URL: ',this.avatarUrl);
  }



}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/