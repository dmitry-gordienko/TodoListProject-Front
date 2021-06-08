import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { PopUpMessageService } from '../../shared/pop-up-message/pop-up-message.service';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { LocalStorageService } from "../device/local-storage.service";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IAuthTokensResponse } from './models/token.model';
import { ILoginRequest } from './models/login.model';
import { IRegistrationRequest } from './models/registration.model';


@Injectable({
    providedIn: 'root'
})
export class AuthorizationService {

    public isAuthorized: boolean = false;

    private _loginUrl: string = environment.hostUrl + 'login';
    private _registerUrl: string = environment.hostUrl + 'register';
    private _authCheckUrl: string = environment.hostUrl + 'checkAuth';
    private _authRefreshUrl: string = environment.hostUrl + 'refreshAuth';

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private location: Location,
        private popUpMsg: PopUpMessageService,
        private spinner: SpinnerService,
        private localStorageService: LocalStorageService,

    ) { }

    ngOnInit() { }

    getHeadersWithAuthorizationToken(): HttpHeaders {
        const accessToken = this.localStorageService.getAccessToken();
        const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
        return headers;
    }

    authOnInit() {
        const accessToken = this.localStorageService.getAccessToken();
        const refreshToken = this.localStorageService.getRefreshToken();

        if (accessToken && refreshToken)
            this.tryToLogin();

        
            if (
            this.location.path() === '/register' ||
            this.location.path() === '/login'
        ) {
            return;
        }

        this.router.navigateByUrl('/login');
    }

    login(loginForm: ILoginRequest) {
        this.spinner.show();

        const payload = new FormData();
        payload.append('email', loginForm.email);
        payload.append('password', loginForm.password);

        this.httpClient
            .post(this._loginUrl, payload)
            .subscribe(
                data => {
                    let resp = data as IAuthTokensResponse;

                    this.localStorageService.setAccessToken(resp.accessToken);
                    this.localStorageService.setRefreshToken(resp.refreshToken);

                    this.isAuthorized = true;

                    this.spinner.hideWithDelay().then(() => {
                        console.log('Login success!', data);
                        this.router.navigateByUrl('/');
                    });
                },
                error => {

                    this.isAuthorized = false;
                    const errorMsg = error.error.Message;

                    this.spinner.hideWithDelay().then(() => {
                        console.log('Login error!', error);
                        this.popUpMsg.showErrorMsg('Failed to login!', errorMsg);
                    });

                },
            );
    }

    register(registrationForm: IRegistrationRequest) {
        this.spinner.show();
        const payload = new FormData();
        payload.append('username', registrationForm.username);
        payload.append('email', registrationForm.email);
        payload.append('password', registrationForm.password);

        this.httpClient
            .post(this._registerUrl, payload)
            .subscribe(
                data => {
                    let resp = data as IAuthTokensResponse;
                    this.localStorageService.setAccessToken(resp.accessToken);
                    this.localStorageService.setRefreshToken(resp.refreshToken);
                    this.isAuthorized = true;

                    this.spinner.hideWithDelay().then(() => {
                        console.log('Registration success!', data);
                        this.router.navigateByUrl('/');
                    });
                },
                error => {
                    this.isAuthorized = false;
                    const errorMsg = error.error.Message;

                    this.spinner.hideWithDelay().then(() => {
                        this.popUpMsg.showErrorMsg('Failed to register!', errorMsg);
                        //console.log('Registration error!', error);
                        //this.router.navigateByUrl('/login');
                    });
                },
            );
    }

    logout() {
        //this.ClearStoredCredentials();
        this.localStorageService.removeAccessToken();
        this.localStorageService.removeRefreshToken();
        this.isAuthorized = false;
        this.router.navigateByUrl('/login');
    }
    /*
        ClearStoredCredentials() {
            this.localStorageService.removeAccessToken();
            this.localStorageService.removeRefreshToken();
            this.isAuthorized = false;
        }
        */
    /*
        GetAccessToken() {
            return localStorage.getItem(this.accessTokenName);
        }
        */

    tryToLogin() {
        this.spinner.show();
        console.log('Trying to login...');
        const accessToken = this.localStorageService.getAccessToken();
        const headers = new HttpHeaders()
            .set('Authorization', `Bearer ${accessToken}`);

        this.httpClient
            .get(this._authCheckUrl, { 'headers': headers })
            .subscribe(
                data => {
                    this.isAuthorized = true;
                    this.spinner.hideWithDelay().then(() => {
                        console.log('Login success!', data);
                        this.router.navigateByUrl('/');
                    });
                },
                error => {
                    this.isAuthorized = false;
                    this.spinner.hideWithDelay().then(() => {
                        console.log('Login fail!', error);
                        this.tryToRefreshToken();
                    });
                },
            );
    }

    tryToRefreshToken() {
        this.spinner.show();
        console.log('Trying refresh token...');
        const refreshToken = this.localStorageService.getRefreshToken();
        const data = new FormData();
        data.append('RefreshToken', refreshToken || '');

        this.httpClient
            .post(this._authRefreshUrl, data)
            .subscribe(
                data => {
                    let resp = data as IAuthTokensResponse;

                    this.localStorageService.setAccessToken(resp.accessToken);
                    this.localStorageService.setRefreshToken(resp.refreshToken);

                    this.isAuthorized = true;

                    this.spinner.hideWithDelay().then(() => {
                        console.log('Refresh success!', data);
                        this.router.navigateByUrl('/');
                    });
                },
                error => {
                    this.isAuthorized = false;

                    this.spinner.hideWithDelay().then(() => {
                        this.router.navigateByUrl('/login');
                        console.log('Auth check error!', error);
                    });

                },
            );

    }

    setSessionAfterLogin(res: IAuthTokensResponse) {
        this.localStorageService.setAccessToken(res.accessToken);
        this.localStorageService.setRefreshToken(res.refreshToken);
    }

    refreshToken(): Observable<IAuthTokensResponse> {

        const refreshToken = this.localStorageService.getRefreshToken();
        const data = new FormData();
        data.append('RefreshToken', refreshToken || '');

        return this.httpClient.post<IAuthTokensResponse>(this._authRefreshUrl, data)
        .pipe(
            map((res: IAuthTokensResponse) => {this.setSessionAfterLogin(res); return res;})
        );
            
    }

}
