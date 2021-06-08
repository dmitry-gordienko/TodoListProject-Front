import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { HttpService } from "../http/http.service";
import { IAddItemRequest } from './models/add-item-request.model';
import { ITodoItem } from './models/todo-item.model';
import { IUpdateItemRequest } from './models/update-item-request.model';


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

    addNewItemToList(newItem: IAddItemRequest): Observable<ITodoItem> {
        const body = this.mapToFormData(newItem);
        return this.httpService.request('post', this._apiUrl, { body: body });
    }

    modifyItem(item: IUpdateItemRequest): Observable<any> {
        const body = this.mapToFormData(item);
        return this.httpService.request('patch', this._apiUrl, { body: body });
    }

    deleteItem(itemId: number): Observable<any> {
        const url = this._apiUrl + '/' + itemId;
        return this.httpService.request('delete', url);
    }

    mapToFormData(obj: any): FormData {
        const form = new FormData();
        const keys = Object.keys(obj);

        for (let key of keys) {
            let val = obj[key];
            form.append(key, val.toString());
        }

        return form;
    }

}
