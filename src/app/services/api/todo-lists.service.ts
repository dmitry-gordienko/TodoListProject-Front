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
    const headers = this.authService.GetHeadersWithAuthorizationToken();

    return this.httpClient.get<ITodoList[]>(this.config.apiTodoListsUrl, { 'headers': headers });
  }

  CreateNewList(newListName: string): Observable<ITodoList>
  {
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    
    const body = new FormData();
    body.append('name', newListName);

    return this.httpClient.post<ITodoList>(this.config.apiTodoListsUrl, body, {'headers': headers});
  }

  SendByEmail(listId:number):Observable<any>{
    const url = this.config.apiTodoListsUrl + `/${listId}/sendByEmail`;
    
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    
    return this.httpClient.post(url, '', {'headers': headers});
  }

  DeleteList(listId:number){
    const url = this.config.apiTodoListsUrl + `/${listId}`;
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    return this.httpClient.delete(url, {'headers': headers});
  }


}
