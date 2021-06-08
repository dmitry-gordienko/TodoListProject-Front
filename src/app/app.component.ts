import { Component } from '@angular/core';
import { AuthorizationService } from './core/auth/authorization.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    constructor(private authorizationService: AuthorizationService) { }

    ngOnInit() {
        //this.authorizationService.authOnInit();
    }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/