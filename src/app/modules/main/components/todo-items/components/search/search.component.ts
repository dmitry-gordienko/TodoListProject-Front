import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITodoItem } from 'src/app/core/todo-items/models/todo-item.model';
import { ITodoList } from 'src/app/core/todo-lists/models/todo-list.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Input() itemsList?: ITodoItem[];
    @Input() filteredItemsList!: ITodoItem[];
    @Output() filteredItemsListChange = new EventEmitter<ITodoItem[]>();

    choiceShowAll: boolean = false;
    choiceShowUndone: boolean = false;

    constructor() { }

    ngOnInit(): void {


    }

    showStatus() {

        if (!this.itemsList) {
            return;
        }

        if (this.choiceShowUndone) {
            
            /*
            this.emptyFilter();
            for(var item of this.itemsList){
                if(!item.isDone) {
                    this.filteredItemsList.push(item);
                }
            }
            */
            this.filteredItemsList = this.itemsList.filter(x => !x.isDone);
        }
        else {
            
            this.filteredItemsList = this.itemsList;
            //this.refreshFiltered();
        }

        this.filteredItemsListChange.emit(this.filteredItemsList);
    }
/*
    refreshFiltered()
    {
        this.emptyFilter();
        
        if( !this.itemsList || this.itemsList.length < 0) { return; }
        
        for(var item of this.itemsList){
            this.filteredItemsList.push(item);
        }

    }
    
    emptyFilter()
    {
        while(this.filteredItemsList.length > 0){
            this.filteredItemsList.pop();
        }

    }
*/
}
