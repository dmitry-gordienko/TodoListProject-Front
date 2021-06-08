import { Component, OnInit } from '@angular/core';
import { ITodoList } from 'src/app/core/todo-lists/models/todo-list.model';
import { TodoListsService } from '../../../core/todo-lists/todo-lists.service';
import { TodoItemsService } from '../../../core/todo-items/todo-items.service';
//import { TodoListsComponent } from "../components/todo-lists/todo-lists.component";
//import { TodoItemsComponent } from "../components/todo-items/todo-items.component";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    selectedList!: ITodoList;

    constructor(private todoListsService: TodoListsService, private todoItemssService: TodoItemsService) { }

    ngOnInit(): void {
    }

}
