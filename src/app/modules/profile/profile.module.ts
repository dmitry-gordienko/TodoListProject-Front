import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerService } from "../../shared/spinner/spinner.service";
import { ProfileComponent } from "./page/profile.component";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxSpinnerModule,
        ProfileRoutingModule
    ],
    declarations: [
        ProfileComponent
    ],
    providers: [
        SpinnerService,
    ],
})
export class ProfileModule { }
