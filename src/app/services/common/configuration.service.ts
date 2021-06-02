import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  
  public readonly apiCheckAuthUrl: string = 'http://localhost:5000/checkAuth';
  
  public readonly apiLoginUrl: string = 'http://localhost:5000/login';
  public readonly apiRegisterUrl: string = 'http://localhost:5000/register';
  public readonly apiRefreshAuthUrl: string = 'http://localhost:5000/refreshAuth';

  public readonly apiTodoListsUrl: string = 'http://localhost:5000/api/todoLists';
  public readonly apiTodoItemsUrl: string = 'http://localhost:5000/api/items';

  public readonly accessTokenName: string = 'accessToken';
  public readonly refreshTokenName: string = 'refreshToken';

  constructor() { }
}
