import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListsService, ITodoList } from 'src/app/services/api/todo-lists.service';
import { TodoItemsService, ITodoItem } from '../../services/api/todo-items.service';
import { PopUpMessageService } from '../../services/common/pop-up-message.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {
  
  @Input() list?: ITodoList;
  @Output() listChange = new EventEmitter<ITodoList>();

  newItemName:string = '';

  itemsList!: ITodoItem[];

  constructor(
    private todoListsService: TodoListsService,
    private todoItemsService: TodoItemsService,
    private popUpMsg: PopUpMessageService,
  ) { }

  ngOnInit(): void {
    console.log("List selected!");
  }
  
  
  ngOnChanges(list: ITodoList) {
    
    if(!this.list){
      return;
    }
    this.GetItemsByListId(this.list!.id);
  }

  GetItemsByListId(ListId:number): void{
    this.todoItemsService.GetItemsByListId(ListId)
      .subscribe(items => {
        console.log(items);
        this.itemsList = items;
      });
  }

  newItemKeypressEvent(event:any)
  {
    if(event.key!=='Enter'){
      return;
    }
    if(this.newItemName === '')
      this.popUpMsg.ShowErrorMsg('Input error', 'New item name needed');
    console.log('New item: ', this.newItemName);

      this.todoItemsService.AddNewItemToList(this.newItemName, this.list!.id)
      .subscribe(item => {
        this.newItemName = '';
        this.itemsList.push(item);
        console.log('New item: ', item);
        this.list!.totalItemsCount += 1;
        this.listChange.emit(this.list);
      });
  }

  SendByEmail()
  {
    if(!this.list)
    {
      this.popUpMsg.ShowErrorMsg('Request error', "Please select the list");
      return;
    }

    if(this.itemsList && this.itemsList.length < 1)
    {
      this.popUpMsg.ShowErrorMsg('Nothing to send', "List is empty");
      return;
    }

    this.todoListsService.SendByEmail(this.list!.id)
    .subscribe(
      data =>{
        this.popUpMsg.ShowSuccessMsg('Success', "Email has been sent to you");
      },
      error =>{
        this.popUpMsg.ShowErrorMsg('Email error', "Something wrong");
      }
    );
  }

}
