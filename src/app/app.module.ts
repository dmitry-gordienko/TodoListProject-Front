import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { RegistrationComponent } from './core/auth/registration/registration.component';
import { LoginComponent } from './core/auth/login/login.component';
import { MainComponent } from './core/main/main.component';
import { TodoListsComponent } from './core/todo-lists/todo-lists.component';
import { TodoItemsComponent } from './core/todo-items/todo-items.component';

import { AuthorizationService } from './core/auth/authorization.service';
import { PopUpMessageService } from './shared/pop-up-message.service';
import { SpinnerService } from './shared/spinner.service';
import { TodoListsService } from './core/todo-lists/todo-lists.service';
import { TodoItemsService } from './core/todo-items/todo-items.service';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', component: MainComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegistrationComponent },
        ]),
        ToastrModule.forRoot(),
        NgxSpinnerModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [

        AppComponent,
        TopBarComponent,
        RegistrationComponent,
        LoginComponent,
        MainComponent,
        TodoListsComponent,
        TodoItemsComponent,
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        AuthorizationService,
        PopUpMessageService,
        SpinnerService,
        TodoListsService,
        TodoItemsService
    ]
})

export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/