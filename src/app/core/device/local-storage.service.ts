import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private _access_token: string = 'access_token';
    private _refresh_token: string = 'refresh_token';

    constructor() { }

    get(name: string): any {
        let stringValue = localStorage.getItem(name);
        return stringValue ? JSON.parse(stringValue) : stringValue;
    }

    set(name: string, value: any): void {
        if (value != null) {
            let stringValue = JSON.stringify(value);
            localStorage.setItem(name, stringValue);
        }
        else {
            localStorage.removeItem(name);
        }
    }

    remove(name: string): void {
        localStorage.removeItem(name);
    }

    getAccessToken(): string | null {
        return localStorage.getItem(this._access_token);
    }

    setAccessToken(accessToken: string): void {
        localStorage.setItem(this._access_token, accessToken);
    }

    removeAccessToken(): void {
        localStorage.removeItem(this._access_token);
    }

    getRefreshToken(): string | null {
        return localStorage.getItem(this._refresh_token);
    }

    setRefreshToken(refreshToken: string): void {
        localStorage.setItem(this._refresh_token, refreshToken);
    }

    removeRefreshToken(): void {
        localStorage.removeItem(this._refresh_token);
    }

}
