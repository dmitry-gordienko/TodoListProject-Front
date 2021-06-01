import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthorizationService, IRegistrationRequest } from '../authorization.service'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.formBuilder.group({
    username: '',
    email: '',
    password:''
  });

  registrationData: IRegistrationRequest = {
    username: '',
    email: '',
    password: ''
  };
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.registrationData.username = this.registrationForm.get('username')?.value;
    this.registrationData.email = this.registrationForm.get('email')?.value;
    this.registrationData.password = this.registrationForm.get('password')?.value;

    this.authService.Register(this.registrationData);
    
  }

}
