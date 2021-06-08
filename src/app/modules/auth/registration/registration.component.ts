import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IRegistrationRequest } from 'src/app/core/auth/models/registration.model';
import { AuthorizationService } from '../../../core/auth/authorization.service'

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

    registrationForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, /*Validators.email,*/ Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(6)]]
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

    onSubmit() {
        this.registrationData.username = this.registrationForm.get('username')?.value;
        this.registrationData.email = this.registrationForm.get('email')?.value;
        this.registrationData.password = this.registrationForm.get('password')?.value;

        this.authService.register(this.registrationData);

    }

}
