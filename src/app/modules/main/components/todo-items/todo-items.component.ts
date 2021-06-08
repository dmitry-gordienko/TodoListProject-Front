import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoListsService, ITodoList } from '../../../../core/todo-lists/todo-lists.service';
import { TodoItemsService, ITodoItem, IUpdateItemRequest, IAddItemRequest } from '../../../../core/todo-items/todo-items.service';
import { PopUpMessageService } from '../../../../shared/pop-up-message.service';

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
        this.getItemsByListId(this.currentList!.id);
    }

    getItemsByListId(ListId: number): void {
        this.todoItemsService.getItemsByListId(ListId)
            .subscribe(items => {
                console.log(items);
                this.itemsList = items;
            });
    }

    newItemKeypressEvent(event: any) {
        if (event.key !== 'Enter') {
            return;
        }

        if (!this.currentList) {
            this.popUpMsg.showErrorMsg('Error', 'Select list to work');
            return;
        }

        if (this.newItemName === '') {
            this.popUpMsg.showErrorMsg('Input error', 'New item name needed');
            return;
        }
        console.log('New item: ', this.newItemName);

        const newItemRequest: IAddItemRequest = {
            name: this.newItemName,
            todoListId: this.currentList!.id
        };

        this.todoItemsService.addNewItemToList(newItemRequest)
            .subscribe(item => {
                this.newItemName = '';
                this.itemsList.push(item);
                console.log('New item: ', item);
                this.currentList!.totalItemsCount += 1;
                //this.listChange.emit(this.list);
            });
    }

    sendByEmail() {
        if (!this.currentList) {
            this.popUpMsg.showErrorMsg('Request error', "Please select the list");
            return;
        }

        if (this.itemsList && this.itemsList.length < 1) {
            this.popUpMsg.showErrorMsg('Nothing to send', "List is empty");
            return;
        }

        this.todoListsService.sendByEmail(this.currentList!.id)
            .subscribe(
                data => {
                    this.popUpMsg.showSuccessMsg('Success', "Email has been sent to you");
                },
                error => {
                    this.popUpMsg.showErrorMsg('Email error', "Something wrong");
                }
            );
    }

    switchItemDoneStatus(item: ITodoItem) {

        let updateRequestItem: IUpdateItemRequest = {
            id: item.id,
            name: item.name,
            isDone: !item.isDone
        };
        this.modifyItem(updateRequestItem);

    }

    modifyItem(item: IUpdateItemRequest) {
        this.todoItemsService.modifyItem(item)
            .subscribe(
                data => {

                    for (let i = 0; i < this.itemsList.length; i++) {
                        if (this.itemsList[i].id == data.id) {
                            this.itemsList[i] = data as ITodoItem;
                        }
                    }

                    this.refreshCurrentListCounts();
                },
                error => {

                    this.popUpMsg.showErrorMsg('Error', "Something wrong");
                });
    }

    refreshCurrentListCounts() {

        this.currentList!.totalItemsCount = this.itemsList.length;

        let doneCounter = 0;
        for (let item of this.itemsList) {
            if (item.isDone) {
                doneCounter += 1;
            }
        }

        this.currentList!.doneItemsCount = doneCounter;
    }

    deleteItem(item: ITodoItem) {

        this.todoItemsService.deleteItem(item.id)
            .subscribe(
                data => {
                    this.itemsList.forEach((value, index) => {
                        if (value.id == item.id) this.itemsList.splice(index, 1);
                    });
                    this.refreshCurrentListCounts();
                },
                error => {
                    this.popUpMsg.showErrorMsg('Error', "Something wrong");
                }
            );
    }

}
