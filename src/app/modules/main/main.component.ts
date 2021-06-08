import { Component, OnInit } from '@angular/core';
import { ITodoList, TodoListsService } from '../../core//todo-lists/todo-lists.service';
import { TodoItemsService } from '../../core/todo-items/todo-items.service';


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
