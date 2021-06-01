import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigurationService } from './configuration.service';


export interface IRegistrationRequest {
  username: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  
  public isAuthorized: boolean = false;

  private readonly accessTokenName:string = 'accessToken';
  private readonly refreshTokenName:string = 'refreshToken';
  
  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private location: Location,
    private configuration: ConfigurationService
    ) { }

  ngOnInit() { }

  AuthOnInit()
  {
    const accessToken = localStorage.getItem(this.accessTokenName);
    const refreshToken = localStorage.getItem(this.refreshTokenName);

    if(accessToken && refreshToken)
      this.TryToLogin();
    
    if(
      this.location.path() === '/register' ||
      this.location.path() === '/login'
      )
      return;
    
    this.router.navigateByUrl('/login');
  }

  Login(loginForm: ILoginRequest)
  {
    const payload = new FormData();
    payload.append('email', loginForm.email);
    payload.append('password', loginForm.password);
    this.httpClient
    .post(this.configuration.apiLoginUrl, payload)
    .subscribe(
      data => {
        let resp = data as ILoginResponse;

        localStorage.setItem(this.accessTokenName, resp.accessToken);
        localStorage.setItem(this.refreshTokenName, resp.refreshToken);
        this.isAuthorized = true;
        
        console.log('Login success!', data);
        
        this.router.navigateByUrl('/');
      },
      error => {
        this.isAuthorized = false; 
        console.log('Login error!', error);
        //this.router.navigateByUrl('/login');
      },
    );
  }

  Register(registrationForm: IRegistrationRequest)
  {
    const payload = new FormData();
    payload.append('username', registrationForm.username);
    payload.append('email', registrationForm.email);
    payload.append('password', registrationForm.password);
    
    this.httpClient
    .post(this.configuration.apiRegisterUrl, payload)
    .subscribe(
      data => {
        let resp = data as ILoginResponse;
        
        localStorage.setItem(this.accessTokenName, resp.accessToken);
        localStorage.setItem(this.refreshTokenName, resp.refreshToken);
        this.isAuthorized = true;
        
        console.log('Registration success!', data);
        
        this.router.navigateByUrl('/');
      },
      error => {
        this.isAuthorized = false;
        console.log('Registration error!', error);
        //this.router.navigateByUrl('/login');
      },
    );
  }

  Logout(){
    this.ClearStoredCredentials();
    this.router.navigateByUrl('/login');
  }

  ClearStoredCredentials(){
    localStorage.removeItem(this.accessTokenName);
    localStorage.removeItem(this.refreshTokenName);
    this.isAuthorized = false;
  }

  GetAccessToken(){
    return localStorage.getItem(this.accessTokenName);
  }

  TryToLogin()
  {
    console.log('Trying to login...');
    const accessToken = localStorage.getItem(this.accessTokenName);
    const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${accessToken}`);

    this.httpClient
    .get(this.configuration.apiCheckAuthUrl, {'headers': headers})
    .subscribe(
      data => {
        this.isAuthorized = true;
        console.log('Login success!', data);
        this.router.navigateByUrl('/');
      },
      error => {
        this.isAuthorized = false;
        console.log('Login fail!', error);
        this.TryToRefreshToken();
      },
    );
  }

  TryToRefreshToken()
  {
    console.log('Trying refresh token...');
    const refreshToken = localStorage.getItem(this.refreshTokenName);
    const data = new FormData();
    data.append('RefreshToken', refreshToken || '');
    
    this.httpClient
    .post(this.configuration.apiRefreshAuthUrl, data)
    .subscribe(
      data => {
        let resp = data as ILoginResponse;
        
        localStorage.setItem(this.accessTokenName, resp.accessToken);
        localStorage.setItem(this.refreshTokenName, resp.refreshToken);
        this.isAuthorized = true;
        
        console.log('Refresh success!', data);
        
        this.router.navigateByUrl('/');
      },
      error => {
        this.isAuthorized = false;
        this.router.navigateByUrl('/login');
        console.log('Auth check error!', error);
      },
    );

  }


}
