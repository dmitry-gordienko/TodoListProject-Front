import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../device/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(private localStorageService: LocalStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let accessToken = this.localStorageService.getAccessToken();
        if (accessToken) {
            request = this.addToken(request, accessToken);
        }

        return next.handle(request);
    }

    addToken(request: HttpRequest<any>, currentToken: string): HttpRequest<any> {
        let newHeaders = new HttpHeaders();
        for (const key of request.headers.keys()) {
            newHeaders = newHeaders.set(key, request.headers.getAll(key)!);
        }
        newHeaders = newHeaders.set('Authorization', `Bearer ${currentToken}`);
        return request.clone({ headers: newHeaders });
    }
}
