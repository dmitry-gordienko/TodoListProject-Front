import { Component, OnInit } from '@angular/core';
import { ITodoList, TodoListsService } from '../../services/api/todo-lists.service';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})


export class TodoListsComponent implements OnInit {

  lists: ITodoList[] = [];

  constructor(
    private todoListService: TodoListsService
  ) { }

  ngOnInit(): void {
    this.GetLists();
    console.log('Init - Lists component:', this.lists);
    
    
  }

  GetLists(){
    
    this.todoListService.GetCollectionTmp()
      .subscribe(lists => {
        //console.log('1 ',this.lists);
        //console.log('2', lists);
        this.lists = lists;
        //console.log('3', this.lists);
      });
      //this.todoListService.GetCollectionTmp().subscribe(lists => this.lists = lists);
    //console.log('Lists component:', this.lists);
  }

}
