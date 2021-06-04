import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../../services/common/authorization.service';
import { ConfigurationService } from '../../services/common/configuration.service';

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

  constructor(
    private authService: AuthorizationService,
    private config: ConfigurationService,
    private httpClient: HttpClient
  ) { }


  GetItemsByListId(listId: number): Observable<ITodoItem[]>
  {
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    
    const url = this.config.apiTodoItemsUrl + '?todoListId=' + listId;

    return this.httpClient.get<ITodoItem[]>(url, { 'headers': headers });
  }
  
  AddNewItemToList(newItem:IAddItemRequest): Observable<ITodoItem>
  {
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    const body = this.MapToFormData(newItem);
    return this.httpClient.post<ITodoItem>(this.config.apiTodoItemsUrl, body, {'headers': headers});
  }

  ModifyItem(item: IUpdateItemRequest){
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    const body = this.MapToFormData(item);
    return this.httpClient.patch<ITodoItem>(this.config.apiTodoItemsUrl, body, {'headers': headers});
  }

  DeleteItem(itemId: number)
  {
    const url = this.config.apiTodoItemsUrl + '/' + itemId;
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    return this.httpClient.delete(url, {'headers': headers});
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
