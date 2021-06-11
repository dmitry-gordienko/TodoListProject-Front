import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { HttpService } from "../http/http.service";
import { IAddItemRequest } from './models/add-item-request.model';
import { ITodoItem } from './models/todo-item.model';
import { IUpdateItemRequest } from './models/update-item-request.model';
import { IItemsFilterRequest } from "./models/items-filter-request.model";


@Injectable({
    providedIn: 'root'
})
export class TodoItemsService {

    private _apiUrl = 'api/items';

    constructor(
        private httpService: HttpService
    ) { }


    getItemsByListId(listId: number): Observable<ITodoItem[]> {
        const url = this._apiUrl + '?todoListId=' + listId;
        return this.httpService.request('get', url);
    }

    getFilteredItemsByListId(filter: IItemsFilterRequest): Observable<ITodoItem[]> {
        const url = this._apiUrl + '/filter';
        const body = this.httpService.mapToFormData(filter);
        
        return this.httpService.request('post', url, { body: body });
    }

    addNewItemToList(newItem: IAddItemRequest): Observable<ITodoItem> {
        const body = this.httpService.mapToFormData(newItem);
        return this.httpService.request('post', this._apiUrl, { body: body });
    }

    modifyItem(item: IUpdateItemRequest): Observable<any> {
        const body = this.httpService.mapToFormData(item);
        return this.httpService.request('patch', this._apiUrl, { body: body });
    }

    deleteItem(itemId: number): Observable<any> {
        const url = this._apiUrl + '/' + itemId;
        return this.httpService.request('delete', url);
    }

    

}
