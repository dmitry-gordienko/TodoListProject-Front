import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from '../common/configuration.service';
import { AuthorizationService } from '../common/authorization.service';
import { Observable } from 'rxjs';


export interface ITodoList {
  id: number;
  name: string;
  totalItemsCount: number;
  doneItemsCount: number;
}


@Injectable({
  providedIn: 'root'
})
export class TodoListsService{

  constructor(
    private config: ConfigurationService,
    private authService: AuthorizationService,
    private httpClient: HttpClient,
  ) { }
  
  GetListsCollection(): Observable<ITodoList[]>
  {
    const accessToken = localStorage.getItem(this.config.accessTokenName);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.httpClient.get<ITodoList[]>(this.config.apiTodoListsUrl, { 'headers': headers });
  }

  CreateNewList(newListName: string): Observable<ITodoList>
  {
    const accessToken = this.authService.GetAccessToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    
    const body = new FormData();
    body.append('name', newListName);

    return this.httpClient.post<ITodoList>(this.config.apiTodoListsUrl, body, {'headers': headers});
  }



}
