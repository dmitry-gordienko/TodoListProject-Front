import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthInterceptor } from './auth.interceptor';
import { EndpointInterceptor } from './endpoint.interceptor';


class HttpInterceptorHandler implements HttpHandler {

    constructor(private next: HttpHandler, private interceptor: HttpInterceptor) { }

    handle(request: HttpRequest<any>): Observable<HttpEvent<any>> {
        return this.interceptor.intercept(request, this.next);
    }
}


export const HTTP_DYNAMIC_INTERCEPTORS = new InjectionToken<HttpInterceptor>('HTTP_DYNAMIC_INTERCEPTORS');

@Injectable({
    providedIn: 'root'
})
export class HttpService extends HttpClient {

    constructor(
        private httpHandler: HttpHandler,
        private injector: Injector,
        @Optional() @Inject(HTTP_DYNAMIC_INTERCEPTORS) private interceptors: HttpInterceptor[] = []) {

            super(httpHandler);

            if (!this.interceptors) {
                
                this.interceptors = [
                    //this.injector.get(EndpointInterceptor),
                    this.injector.get(AuthInterceptor),
                ];
                
            }
        }

    request(method?: any, url?: any, options?: any): any {
        const handler = this.interceptors.reduceRight(
            (next, interceptor) => new HttpInterceptorHandler(next, interceptor), this.httpHandler
        );
        return new HttpClient(handler).request(method, url, options);
    }







}
