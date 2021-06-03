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

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  constructor(
    private authorizationService: AuthorizationService,
    private config: ConfigurationService,
    private httpClient: HttpClient
  ) { }


  GetItemsByListId(listId: number): Observable<ITodoItem[]>
  {
    const accessToken = localStorage.getItem(this.config.accessTokenName);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    
    const url = this.config.apiTodoItemsUrl + '?todoListId=' + listId;

    return this.httpClient.get<ITodoItem[]>(url, { 'headers': headers });
  }
  
  AddNewItemToList(itemName:string, listId: number): Observable<ITodoItem>
  {
    const accessToken = localStorage.getItem(this.config.accessTokenName);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    
    const body = new FormData();
    body.append('name', itemName);
    body.append('todoListId', listId.toString());
    return this.httpClient.post<ITodoItem>(this.config.apiTodoItemsUrl, body, {'headers': headers});
  }
  
}
