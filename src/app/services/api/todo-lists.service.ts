import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from '../common/configuration.service';
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
    private httpClient: HttpClient,
  ) { }

  GetCollection()
  {
    const accessToken = localStorage.getItem(this.config.accessTokenName);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);
    //let result:ITodoList[];
    let result = this.httpClient
      .get(this.config.apiTodoListsUrl, { 'headers': headers })
      .subscribe(
        data => {
          let listsCollection:ITodoList[] = data as ITodoList[];
          /*
          this.isAuthorized = true;
          this.spinner.HideWithDelay().then(()=>{
            console.log('Login success!', data);
            this.router.navigateByUrl('/');
          });
          */
         //return data;
         console.log(data);
         console.log(listsCollection);
         return data as ITodoList[];
        },
        error => {
          console.log(error);
          /*
          this.isAuthorized = false;
          this.spinner.HideWithDelay().then(()=>{
            console.log('Login fail!', error);
            this.TryToRefreshToken();
          });
          */
        },
      );
  }

  GetCollectionTmp(): Observable<ITodoList[]>
  {
    const accessToken = localStorage.getItem(this.config.accessTokenName);

    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);
    
    return this.httpClient
      .get<ITodoList[]>(this.config.apiTodoListsUrl, { 'headers': headers });
      //.pipe();

  }




}
