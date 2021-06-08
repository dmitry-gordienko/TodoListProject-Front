import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { PopUpMessageService } from './shared/pop-up-message/pop-up-message.service';
import { SpinnerService } from './shared/spinner/spinner.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        NgxSpinnerModule,
        SharedModule,
        AppRoutingModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [

        AppComponent,

    ],
    bootstrap: [
        AppComponent
    ],
    providers: [
        PopUpMessageService,
        SpinnerService,
    ]
})

export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/