import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { MainRoutingModule } from './main-routing.module';

import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerService } from "../../shared/spinner/spinner.service";


import { MainComponent } from "./page/main.component";
import { TodoListsComponent } from "./components/todo-lists/todo-lists.component";
import { TodoItemsComponent } from "./components/todo-items/todo-items.component";

import { TodoListsService } from "../../core/todo-lists/todo-lists.service";
import { TodoItemsService } from "../../core/todo-items/todo-items.service";
import { SearchComponent } from './components/todo-items/components/search/search.component';



@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        NgxSpinnerModule,
        MainRoutingModule
    ],
    declarations: [
        MainComponent,
        TodoListsComponent,
        TodoItemsComponent,
        SearchComponent,
    ],
    providers: [
        SpinnerService,
        TodoListsService,
        TodoItemsService
    ],
})
export class MainModule { }
