import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { HttpService } from "../http/http.service";


export interface ITodoList {
    id: number;
    name: string;
    totalItemsCount: number;
    doneItemsCount: number;
}

@Injectable({
    providedIn: 'root'
})
export class TodoListsService {

    private _apiUrl: string = 'api/todoLists';

    constructor(
        private httpService: HttpService,
    ) { }

    getListsCollection(): Observable<ITodoList[]> {
        return this.httpService.request('get', this._apiUrl);
    }

    createNewList(newListName: string): Observable<ITodoList> {
        const body = new FormData();
        body.append('name', newListName);

        return this.httpService.request('post', this._apiUrl, { body: body });
    }

    sendByEmail(listId: number): Observable<any> {
        const url = this._apiUrl + `/${listId}/sendByEmail`;
        return this.httpService.request('post', url);
    }

    deleteList(listId: number): Observable<any> {
        const url = this._apiUrl + `/${listId}`;
        return this.httpService.request('delete', url);
    }


}
