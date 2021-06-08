import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from "./top-bar/top-bar.component";

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
    ],
    declarations: [
        TopBarComponent
    ],
    exports: [
        TopBarComponent
    ],
})
export class SharedModule { }
