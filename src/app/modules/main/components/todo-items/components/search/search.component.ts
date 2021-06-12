import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ITodoItem } from 'src/app/core/todo-items/models/todo-item.model';
import { TodoItemsService } from "../../../../../../core/todo-items/todo-items.service";
import { IItemsFilterRequest } from "../../../../../../core/todo-items/models/items-filter-request.model";
import { itemStatusEnum } from "../../../../../../core/todo-items/enums/item-status-filter.enum";
import { SpinnerService } from "../../../../../../shared/spinner/spinner.service";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    @Input() itemsList?: ITodoItem[];
    //@Input() filteredItemsList!: ITodoItem[];
    //@Output() filteredItemsListChange = new EventEmitter<ITodoItem[]>();

    items$!: Observable<ITodoItem[]>;
    private searchTerms = new Subject<string>();

    choiceShowAll: boolean = false;
    choiceShowUndone: boolean = false;

    filter: IItemsFilterRequest = {
        todoListId: 0,
        textFilter: '',
        statusFilter: 0
    };

    constructor(
        private itemsService: TodoItemsService,
        private spinner: SpinnerService,
    ) { }

    ngOnInit(): void {
        this.items$ = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            // switch to new search observable each time the term changes
            switchMap(() => this.itemsService.getFilteredItemsByListId(this.filter)),
        );
    }

    fillFilter(text: string, showUndone: boolean) {

        this.filter.textFilter = text;

        if (this.itemsList && this.itemsList.length > 0) {
            this.filter.todoListId = this.itemsList[0].todoListId;
        }

        if (showUndone) {
            this.filter.statusFilter = itemStatusEnum.Undone;
        } else {
            this.filter.statusFilter = itemStatusEnum.None;
        }
    }

    search(text: string, showUndone: boolean): void {
        //debugger;
        console.log(this.itemsList);
        this.fillFilter(text, showUndone);
        


        this.searchTerms.next();
        
        //this.spinner.show();
        this.items$.subscribe(
            items => {
                this.refreshItemsList(items);
                //this.spinner.hideWithDelay(500);
            },
            error => {
                console.log(error);
            }
        );
        //this.spinner.hideWithDelay(500);
    }

    refreshItemsList(newItems: ITodoItem[]): void {
        //debugger;
        while (this.itemsList!.length > 0) {
            this.itemsList!.pop();
        }
        for (var item of newItems) {
            this.itemsList?.push(item);
        }
    }
}
