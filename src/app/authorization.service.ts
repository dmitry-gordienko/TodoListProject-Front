import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

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
  isAuthorized: boolean = false;
  
  loginApiUrl: string = 'http://localhost:5000/login';
  registerApiUrl: string = 'http://localhost:5000/register';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private location: Location
    ) { }

  ngOnInit() {  }

  AuthOnInit()
  {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

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
    .post(this.loginApiUrl, payload)
    .subscribe(
      data => {
        let resp = data as ILoginResponse;
        localStorage.setItem('accessToken', resp.accessToken);
        localStorage.setItem('refreshToken', resp.refreshToken);
        console.log('Login success!', data);
        this.router.navigateByUrl('/');
      },
      error => console.log('Error!', error),
    );
  }

  Register(registrationForm: IRegistrationRequest)
  {
    const payload = new FormData();
    payload.append('username', registrationForm.username);
    payload.append('email', registrationForm.email);
    payload.append('password', registrationForm.password);
    
    this.httpClient
    .post(this.registerApiUrl, payload)
    .subscribe(
      data => {
        let resp = data as ILoginResponse;
        localStorage.setItem('accessToken', resp.accessToken);
        localStorage.setItem('refreshToken', resp.refreshToken);
        console.log('Registration success!', data);
        this.router.navigateByUrl('/');
      },
      error => console.log('Error!', error),
    );
  }

  ClearStoredCredentials(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

}
