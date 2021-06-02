import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfigurationService } from './configuration.service';
import { PopUpMessageService } from './pop-up-message.service';
import { SpinnerServiceService } from './spinner-service.service';

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

  private readonly accessTokenName: string = 'accessToken';
  private readonly refreshTokenName: string = 'refreshToken';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private location: Location,
    private configuration: ConfigurationService,
    private popUpMsg: PopUpMessageService,
    private spinner: SpinnerServiceService
  ) { }

  ngOnInit() { }

  AuthOnInit() {
    const accessToken = localStorage.getItem(this.accessTokenName);
    const refreshToken = localStorage.getItem(this.refreshTokenName);

    if (accessToken && refreshToken)
      this.TryToLogin();

    if (
      this.location.path() === '/register' ||
      this.location.path() === '/login'
    ){
      return;
    }

    this.router.navigateByUrl('/login');
  }

  Login(loginForm: ILoginRequest) {
    this.spinner.Show();
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

          this.spinner.HideWithDelay().then(()=>{
            console.log('Login success!', data);
            this.router.navigateByUrl('/');
          });
        },
        error => {
          
          this.isAuthorized = false;
          const errorMsg = error.error.Message;
          
          this.spinner.HideWithDelay().then(()=>{
            console.log('Login error!', error);
            this.popUpMsg.ShowErrorMsg('Failed to login!', errorMsg);
          });
        
        },
      );
  }



  Register(registrationForm: IRegistrationRequest) {
    this.spinner.Show();
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

          this.spinner.HideWithDelay().then(()=>{
            console.log('Registration success!', data);
            this.router.navigateByUrl('/');
          });
        },
        error => {
          this.isAuthorized = false;
          const errorMsg = error.error.Message;

          this.spinner.HideWithDelay().then(()=>{
            this.popUpMsg.ShowErrorMsg('Failed to register!', errorMsg);
            //console.log('Registration error!', error);
            //this.router.navigateByUrl('/login');
          });
        },
      );
  }

  Logout() {
    this.ClearStoredCredentials();
    this.router.navigateByUrl('/login');
  }

  ClearStoredCredentials() {
    localStorage.removeItem(this.accessTokenName);
    localStorage.removeItem(this.refreshTokenName);
    this.isAuthorized = false;
  }

  GetAccessToken() {
    return localStorage.getItem(this.accessTokenName);
  }

  TryToLogin() {
    this.spinner.Show();
    console.log('Trying to login...');
    const accessToken = localStorage.getItem(this.accessTokenName);
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`);

    this.httpClient
      .get(this.configuration.apiCheckAuthUrl, { 'headers': headers })
      .subscribe(
        data => {
          this.isAuthorized = true;
          this.spinner.HideWithDelay().then(()=>{
            console.log('Login success!', data);
            this.router.navigateByUrl('/');
          });
        },
        error => {
          this.isAuthorized = false;
          this.spinner.HideWithDelay().then(()=>{
            console.log('Login fail!', error);
            this.TryToRefreshToken();
          });
        },
      );
  }
  
  TryToRefreshToken() {
    this.spinner.Show();
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
          
          this.spinner.HideWithDelay().then(()=>{
            console.log('Refresh success!', data);
            this.router.navigateByUrl('/');
          });
        },
        error => {
          this.isAuthorized = false;

          this.spinner.HideWithDelay().then(()=>{
            this.router.navigateByUrl('/login');
            console.log('Auth check error!', error);
          });
        
        },
      );

  }

  Delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
