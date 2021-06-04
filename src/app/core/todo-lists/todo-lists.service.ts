import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { AuthorizationService } from '../auth/authorization.service';
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

  private _apiUrl: string = environment.hostUrl + 'api/todoLists';

  constructor(
    private authService: AuthorizationService,
    private httpClient: HttpClient,
  ) { }
  
  GetListsCollection(): Observable<ITodoList[]>
  {
    const headers = this.authService.GetHeadersWithAuthorizationToken();

    return this.httpClient.get<ITodoList[]>(this._apiUrl, { 'headers': headers });
  }

  CreateNewList(newListName: string): Observable<ITodoList>
  {
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    
    const body = new FormData();
    body.append('name', newListName);

    return this.httpClient.post<ITodoList>(this._apiUrl, body, {'headers': headers});
  }

  SendByEmail(listId:number):Observable<any>{
    const url = this._apiUrl + `/${listId}/sendByEmail`;
    
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    
    return this.httpClient.post(url, '', {'headers': headers});
  }

  DeleteList(listId:number){
    const url = this._apiUrl + `/${listId}`;
    const headers = this.authService.GetHeadersWithAuthorizationToken();
    return this.httpClient.delete(url, {'headers': headers});
  }


}
