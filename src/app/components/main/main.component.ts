import { Component, OnInit } from '@angular/core';
import { ITodoList, TodoListsService } from '../../services/api/todo-lists.service';
import { TodoItemsService } from '../../services/api/todo-items.service';


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
