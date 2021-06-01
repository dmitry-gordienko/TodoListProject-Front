import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Injectable({
    providedIn: 'root'
})

export class CredentialsService {

    accessToken: string = '';
    refreshToken: string = '';

    LoadStoredCredentials(){
        this.accessToken = localStorage.getItem('accessToken')!;
        this.refreshToken = localStorage.getItem('refreshToken')!;
    }

    
    LogCredentials(){
        console.log(this.accessToken);
        console.log(this.refreshToken);
    }

}