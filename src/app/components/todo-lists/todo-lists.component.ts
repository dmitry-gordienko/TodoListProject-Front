import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITodoList, TodoListsService } from '../../services/api/todo-lists.service';
import { PopUpMessageService } from '../../services/common/pop-up-message.service';

@Component({
  selector: 'app-todo-lists',
  templateUrl: './todo-lists.component.html',
  styleUrls: ['./todo-lists.component.scss']
})


export class TodoListsComponent implements OnInit {

  lists: ITodoList[] = [];
  
  @Input() selectedList!: ITodoList;
  @Output() selectedListChange = new EventEmitter<ITodoList>();
  
  newListName?: string;

  constructor(
    private todoListService: TodoListsService,
    private popUpMsg: PopUpMessageService,
  ) { }

  ngOnInit(): void {
    this.GetLists();
  }

  GetLists(): void{
    this.todoListService.GetListsCollection()
      .subscribe(lists => {
        this.lists = lists;
      });
  }

  OnSelect(el: ITodoList):void {
    this.selectedList = el;
    console.log(this.selectedList);
    this.selectedListChange.emit(this.selectedList);
  }

  NewListButton():void {

    if(!this.newListName || this.newListName === ''){
      this.popUpMsg.ShowErrorMsg('Input error', 'Enter a new list name.');
      return;
    }
    this.CreateNewList();
  }

  NewListKeypress(event: any)
  {
    if(event.key!=='Enter'){
      return;
    }

    if(!this.newListName || this.newListName === ''){
      this.popUpMsg.ShowErrorMsg('Input error', 'Enter a new list name.');
      return;
    }
    this.CreateNewList();
  }

  CreateNewList(){
    this.todoListService.CreateNewList(this.newListName || '')
      .subscribe(list => {
        this.lists.push(list);
      });
  }

}
