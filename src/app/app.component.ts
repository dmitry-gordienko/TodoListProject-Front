import { Component, Input } from '@angular/core';
import { AuthorizationService } from './core/auth/authorization.service';
import { IUserFullModel } from './core/user/models/user-full.model';
import { UserService } from './core/user/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    user!: IUserFullModel;

    constructor(
        private authorizationService: AuthorizationService,
        private userService: UserService,
        ) { }

    ngOnInit() {
        this.authorizationService.authOnInit();
        this.user = this.userService.user;
    }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/