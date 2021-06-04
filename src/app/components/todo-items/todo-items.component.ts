import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListsService, ITodoList } from 'src/app/services/api/todo-lists.service';
import { TodoItemsService, ITodoItem, IUpdateItemRequest, IAddItemRequest } from '../../services/api/todo-items.service';
import { PopUpMessageService } from '../../services/common/pop-up-message.service';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.scss']
})
export class TodoItemsComponent implements OnInit {

  @Input() currentList?: ITodoList;
  //@Output() listChange = new EventEmitter<ITodoList>();

  newItemName: string = '';

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

    if (!this.currentList) {
      return;
    }
    this.GetItemsByListId(this.currentList!.id);
  }

  GetItemsByListId(ListId: number): void {
    this.todoItemsService.GetItemsByListId(ListId)
      .subscribe(items => {
        console.log(items);
        this.itemsList = items;
      });
  }

  newItemKeypressEvent(event: any) {
    if (event.key !== 'Enter') {
      return;
    }
    
    if(!this.currentList){
      this.popUpMsg.ShowErrorMsg('Error', 'Select list to work');
      return;
    }
    
    if (this.newItemName === ''){
      this.popUpMsg.ShowErrorMsg('Input error', 'New item name needed');
      return;
    }
    console.log('New item: ', this.newItemName);
    
    const newItemRequest: IAddItemRequest = {
      name: this.newItemName,
      todoListId:this.currentList!.id
    };
    
    this.todoItemsService.AddNewItemToList(newItemRequest)
      .subscribe(item => {
        this.newItemName = '';
        this.itemsList.push(item);
        console.log('New item: ', item);
        this.currentList!.totalItemsCount += 1;
        //this.listChange.emit(this.list);
      });
  }

  SendByEmail() {
    if (!this.currentList) {
      this.popUpMsg.ShowErrorMsg('Request error', "Please select the list");
      return;
    }

    if (this.itemsList && this.itemsList.length < 1) {
      this.popUpMsg.ShowErrorMsg('Nothing to send', "List is empty");
      return;
    }

    this.todoListsService.SendByEmail(this.currentList!.id)
      .subscribe(
        data => {
          this.popUpMsg.ShowSuccessMsg('Success', "Email has been sent to you");
        },
        error => {
          this.popUpMsg.ShowErrorMsg('Email error', "Something wrong");
        }
      );
  }

  SwitchItemDoneStatus(item: ITodoItem) {

    let updateRequestItem: IUpdateItemRequest = {
      id: item.id,
      name: item.name,
      isDone: !item.isDone
    };
    this.ModifyItem(updateRequestItem);

  }

  ModifyItem(item: IUpdateItemRequest){
    this.todoItemsService.ModifyItem(item)
      .subscribe(
        data => {

          for(let i=0; i< this.itemsList.length; i++){
            if(this.itemsList[i].id == data.id){
              this.itemsList[i] = data as ITodoItem;
            }
          }

          this.RefreshCurrentListCounts();
        },
        error => {

          this.popUpMsg.ShowErrorMsg('Error', "Something wrong");
        });
  }

  RefreshCurrentListCounts() {

    this.currentList!.totalItemsCount = this.itemsList.length;

    let doneCounter = 0;
    for(let item of this.itemsList){
      if (item.isDone) {
        doneCounter += 1;
      }
    }
    
    this.currentList!.doneItemsCount = doneCounter;
  }

  DeleteItem(item: ITodoItem) {
    
    this.todoItemsService.DeleteItem(item.id)
      .subscribe(
        data => {
          this.itemsList.forEach((value,index)=>{
            if(value.id == item.id) this.itemsList.splice(index,1);
          });
          this.RefreshCurrentListCounts();
        },
        error => {
          this.popUpMsg.ShowErrorMsg('Error', "Something wrong");
        }
      );

  }


}
