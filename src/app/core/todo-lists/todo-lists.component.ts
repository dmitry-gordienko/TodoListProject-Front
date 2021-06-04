import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITodoList, TodoListsService } from './todo-lists.service';
import { PopUpMessageService } from '../../shared/pop-up-message.service';

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
      .subscribe(
        list => {
          this.lists.push(list);
          this.newListName='';
        },
        error => {
          this.popUpMsg.ShowErrorMsg('Error', "Something wrong");
        }
      );
  }

  DeleteList(list:ITodoList){
    this.todoListService.DeleteList(list.id)
    .subscribe(
      data => {
        
        this.lists.forEach((value,index)=>{
          if(value.id == list.id){

            let newIndex = index;

            if(index == this.lists.length - 1){
              newIndex-=1;
            }

            this.lists.splice(index,1);
            this.selectedList = this.lists[newIndex];
          }
        });
        this.selectedListChange.emit(this.selectedList);
      },
      error => {
        this.popUpMsg.ShowErrorMsg('Error', "Something wrong");
      }
    );

  }

}
