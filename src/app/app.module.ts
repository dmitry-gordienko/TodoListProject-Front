import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
//import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { TodoListsComponent } from './components/todo-lists/todo-lists.component';
import { TodoItemsComponent } from './components/todo-items/todo-items.component';

import { ConfigurationService } from './services/common/configuration.service';
import { AuthorizationService } from './services/common/authorization.service';
import { PopUpMessageService } from './services/common/pop-up-message.service';
import { SpinnerServiceService } from './services/common/spinner-service.service';
//import { from } from 'rxjs';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    //MatProgressSpinnerModule,
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
  providers: [ ConfigurationService, AuthorizationService, PopUpMessageService, SpinnerServiceService ]
})
export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/