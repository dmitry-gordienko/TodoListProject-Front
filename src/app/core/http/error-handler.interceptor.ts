import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { Injectable, Injector } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';
import { AuthorizationService, ILoginResponse } from "../auth/authorization.service";
import { LocalStorageService } from "../device/local-storage.service";


@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

    isRefreshing = false;
    
    defaultTokenSubj: ILoginResponse={
        accessToken:'',
        refreshToken:''
    };

    private refreshTokenSubject = new BehaviorSubject<ILoginResponse>(this.defaultTokenSubj);

    constructor(
        private localStorageService: LocalStorageService,
        private injector: Injector
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(error => this.errorHandler(request, next, error)));
    }

    addToken(request: HttpRequest<any>, currentToken: string): HttpRequest<any> {
        let newHeaders = new HttpHeaders();
        for (const key of request.headers.keys()) {
            newHeaders = newHeaders.set(key, request.headers.getAll(key)!);
        }
        newHeaders = newHeaders.set('Authorization', `Bearer ${currentToken}`);
        return request.clone({ headers: newHeaders });
    }

    private errorHandler(request: HttpRequest<any>, next: HttpHandler, response: HttpErrorResponse): Observable<HttpEvent<any>> {

        
        const auth = this.injector.get(AuthorizationService);

        let urlSections = request.url.split('/');
        let lastUrlSection = urlSections[urlSections.length - 1];

        
        
        if(lastUrlSection == 'refresh'){
            this.isRefreshing = false;
            auth.logout();
        }
        else if (response.status != 401 || lastUrlSection == 'login'){
            this.showErrorMessage(response?.error);
            throw response;
        }

        if(this.isRefreshing){
            console.log('Token refreshing is already in progress...');
            return this.refreshTokenSubject
                .pipe(
                    filter(result => result != null),
                    take(1),
                    switchMap((resp: ILoginResponse) => {
                        return next.handle(this.addToken(request, resp.accessToken));
                    })
                );

        }else {

            console.log('Access token expired! Refresh needed.');
            let token = this.localStorageService.getRefreshToken();

            if (token) {
                console.log('Refresh token found! Trying to refresh access token...');
                this.isRefreshing = true;
                return auth
                    .refreshToken()
                    .pipe(
                        switchMap((resp: ILoginResponse) => {
                            console.log('Got new access token! Applying token to http request...');
                            this.isRefreshing = false;
                            return next.handle(this.addToken(request, resp.accessToken));
                        })
                    );
            }
            else {
                console.log('Refresh token not found! Logging out...');
                this.showErrorMessage(response?.error);
                auth.logout();
                throw response;
            }
        }
    }


    showErrorMessage(error:any) {
        
        console.log('showErrorMessage:', error);

        /*
        let message = error?.message;

        if (error?.error && Array.isArray(error?.error) && error?.error.length > 0) {
            error?.error.forEach(errorDetail => {
                message += '\r\n• ' + errorDetail.message;
            });
        }

        this.uiService.showMessage(message || 'Unbekannter Serverfehler aufgetreten, später erneut versuchen', 'danger', 3000);*/
    }


}
