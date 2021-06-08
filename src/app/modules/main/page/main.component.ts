import { Component, DebugEventListener, OnInit } from '@angular/core';
import { ITodoList } from 'src/app/core/todo-lists/models/todo-list.model';
import { TodoListsService } from '../../../core/todo-lists/todo-lists.service';
import { TodoItemsService } from '../../../core/todo-items/todo-items.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

    selectedList!: ITodoList;
    startUpListId!: number;
    isNew = true;

    constructor(
        private todoListsService: TodoListsService,
        private todoItemssService: TodoItemsService,
        private route: ActivatedRoute,
        //private router: Router
    ) { }

    ngOnInit(): void {
        
        let param = this.route.snapshot.paramMap.get('listId')?.trim();
        console.log('param: ', param);
        
        if(param && param !==''){
            this.startUpListId = parseInt(param);
        } else{
            this.startUpListId = -1;
        }
    }

    ngAfterViewInit() { }

}
