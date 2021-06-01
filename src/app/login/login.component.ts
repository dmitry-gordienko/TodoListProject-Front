import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthorizationService, ILoginRequest } from '../authorization.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password:''
  });
  
  loginData: ILoginRequest = {
    email: '',
    password: ''
  };
  
  constructor(
      private formBuilder: FormBuilder,
      private authService: AuthorizationService
    ) { }
  
    
  onSubmit(){
    
    this.loginData.email = this.loginForm.get('email')?.value;
    this.loginData.password = this.loginForm.get('password')?.value;

    this.authService.Login(this.loginData);
  }
  
  ngOnInit(): void {
  
  }
}
