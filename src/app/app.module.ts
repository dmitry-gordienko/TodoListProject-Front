import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';

import { ConfigurationService } from './configuration.service';
import { AuthorizationService } from './authorization.service';
import { PopUpMessageService } from './pop-up-message.service';
import { from } from 'rxjs';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
    ]),
    ToastrModule.forRoot(),
  ],
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
  providers: [ ConfigurationService, AuthorizationService, PopUpMessageService ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/