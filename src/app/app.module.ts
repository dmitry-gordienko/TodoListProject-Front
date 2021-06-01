import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

import { ConfigurationService } from './configuration.service';
import { AuthorizationService } from './authorization.service';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: MainComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegistrationComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    RegistrationComponent,
    LoginComponent,
    MainComponent,
    TodoListsComponent,
    TodoItemsComponent
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [ ConfigurationService, AuthorizationService ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/