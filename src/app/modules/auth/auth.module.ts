import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";

import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerService } from "../../shared/spinner/spinner.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        AuthRoutingModule,
        NgxSpinnerModule,
    ],
    declarations: [
        LoginComponent,
        RegistrationComponent,
    ],
    providers: [
        SpinnerService

    ],
})
export class AuthModule { }
