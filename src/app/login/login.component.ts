import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthorizationService, ILoginRequest } from '../authorization.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loginData: ILoginRequest = {
    email: '',
    password: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService
  ) { }


  onSubmit() {

    console.log('login button');
    this.loginData.email = this.loginForm.get('email')?.value;
    this.loginData.password = this.loginForm.get('password')?.value;

    this.authService.Login(this.loginData);
  }

  CheckAuth() {
    this.authService.TryToLogin();
  }

  ngOnInit(): void { }
}
