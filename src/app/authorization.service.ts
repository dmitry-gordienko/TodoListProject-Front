import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CredentialsService } from './credentials.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isAuthorized: boolean = false;
  registerApiUrl: string = 'http://localhost:5000/login';


  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(){
    

  }

}
