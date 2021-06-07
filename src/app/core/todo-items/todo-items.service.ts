import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../environments/environment";
import { HttpService } from "../http/http.service";

export interface ITodoItem {
  id: number;
  name: string;
  todoListId: number;
  isDone: boolean;
}

export interface IAddItemRequest {
  name: string;
  todoListId: number;
}

export interface IUpdateItemRequest{
  id: number;
  name: string;
  isDone: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  private _apiUrl = environment.hostUrl + 'api/items';

  constructor(
    private httpService: HttpService
  ) { }


  GetItemsByListId(listId: number): Observable<ITodoItem[]>
  {
    const url = this._apiUrl + '?todoListId=' + listId;
    return this.httpService.request('get', url);
  }
  
  AddNewItemToList(newItem:IAddItemRequest): Observable<ITodoItem>
  {
    const body = this.MapToFormData(newItem);
    return this.httpService.request('post', this._apiUrl, {body: body});
  }

  ModifyItem(item: IUpdateItemRequest): Observable<any>{
    const body = this.MapToFormData(item);
    return this.httpService.request('patch', this._apiUrl, {body:body});
  }

  DeleteItem(itemId: number): Observable<any>{
    const url = this._apiUrl + '/' + itemId;
    return this.httpService.request('delete', url);
  }

  MapToFormData(obj:any): FormData
  {
    const form = new FormData();
    const keys = Object.keys(obj);

    for(let key of keys){
      let val = obj[key];
      form.append(key, val.toString());
    }

    return form;
  }
  
}
