import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
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
      return;
    
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
        console.log('Error!', error);
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
        
        console.log('Registration success!', data);
        
        this.router.navigateByUrl('/');
      },
      error => console.log('Error!', error),
    );
  }

  Logout(){
    this.ClearStoredCredentials();
    this.router.navigateByUrl('/');
  }

  ClearStoredCredentials(){
    localStorage.removeItem(this.accessTokenName);
    localStorage.removeItem(this.refreshTokenName);
  }

  GetAccessToken(){
    return localStorage.getItem(this.accessTokenName);
  }


}
