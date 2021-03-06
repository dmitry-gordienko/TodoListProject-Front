import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ITodoList } from 'src/app/core/todo-lists/models/todo-list.model';
import { TodoListsService } from '../../../../core/todo-lists/todo-lists.service';
import { PopUpMessageService } from '../../../../shared/pop-up-message/pop-up-message.service';

@Component({
    selector: 'app-todo-lists',
    templateUrl: './todo-lists.component.html',
    styleUrls: ['./todo-lists.component.scss']
})


export class TodoListsComponent implements OnInit {

    lists: ITodoList[] = [];

    @Input() selectedList!: ITodoList;
    @Output() selectedListChange = new EventEmitter<ITodoList>();

    @Input() onStartUpListId!: number;

    newListName?: string;

    constructor(
        private todoListService: TodoListsService,
        private popUpMsg: PopUpMessageService,
        private router: Router
    ) { }

    ngOnInit(): void {
        console.log('TodoList component!');
        this.getLists();
    }

    getLists(): void {
        this.todoListService.getListsCollection()
            .subscribe(lists => {
                this.lists = lists;
                if (this.onStartUpListId > 0) {
                    this.selectListById(this.onStartUpListId);
                }
            });
    }

    public selectListById(listId: number): void {
        this.selectedList = this.lists.filter(list => list.id === listId)[0];
        this.selectedListChange.emit(this.selectedList);
    }

    // TODO: убрать после исправления в модели span на routerLink

    onSelect(el: ITodoList): void {
        console.log(this.selectedList);
        
        this.selectedList = el;
        this.selectedListChange.emit(this.selectedList);
        this.router.navigate(['main', el.id]);
        /*
            .then(() => {
                window.location.reload();
            });
            */
    }

    newListButton(): void {

        if (!this.newListName || this.newListName === '') {
            this.popUpMsg.showErrorMsg('Input error', 'Enter a new list name.');
            return;
        }
        this.createNewList();
    }

    newListKeypress(event: any) {
        if (event.key !== 'Enter') {
            return;
        }

        if (!this.newListName || this.newListName === '') {
            this.popUpMsg.showErrorMsg('Input error', 'Enter a new list name.');
            return;
        }
        this.createNewList();
    }

    createNewList() {
        this.todoListService.createNewList(this.newListName || '')
            .subscribe(
                list => {
                    this.lists.push(list);
                    this.newListName = '';
                },
                error => {
                    this.popUpMsg.showErrorMsg('Error', "Something wrong");
                }
            );
    }

    deleteList(list: ITodoList) {
        this.todoListService.deleteList(list.id)
            .subscribe(
                data => {

                    this.lists.forEach((value, index) => {
                        if (value.id == list.id) {

                            let newIndex = index;

                            if (index == this.lists.length - 1) {
                                newIndex -= 1;
                            }

                            this.lists.splice(index, 1);
                            this.selectedList = this.lists[newIndex];
                        }
                    });
                    this.selectedListChange.emit(this.selectedList);
                },
                error => {
                    this.popUpMsg.showErrorMsg('Error', "Something wrong");
                }
            );

    }

}
