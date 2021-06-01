import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient , HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  apiRegisterUrl: string = 'http://localhost:5000/login';
  
  loginForm = this.formBuilder.group({
    email: '',
    password:''
  });
  
  constructor(
      private formBuilder: FormBuilder,
      private httpClient: HttpClient
    ) { }
    
  onSubmit(){

    const formData = new FormData();
    formData.append("email", this.loginForm.get('email')?.value);
    formData.append("password", this.loginForm.get('password')?.value);
    
    this.httpClient
      .post(this.apiRegisterUrl, formData)
      .subscribe(
        data => console.log('Success!', data),
        error => console.log('Error!', error),
      );
    
  }
  
  ngOnInit(): void {
  
  }
}
