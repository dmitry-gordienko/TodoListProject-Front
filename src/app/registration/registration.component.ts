import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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
  
  constructor(
    private formBuilder: FormBuilder,
    ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    
  }

}
