import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IUserFullModel } from "../../../core/user/models/user-full.model";
import { IUserProfileUpdateRequest } from "../../../core/user/models/user-profile-update-request.model";
import { UserService } from "../../../core/user/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
  userInfoForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],

  });

  currentUser?:IUserFullModel;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.userService.currentUser;
    //console.log('profile onInit: ', this.currentUser);
  }

  onInfoSubmit() {

    let info: IUserProfileUpdateRequest = {
      username: this.userInfoForm.get('username')!.value,
      name: this.userInfoForm.get('name')!.value,
      surname: this.userInfoForm.get('surname')!.value,
    };

    this.userService.submitUserInfo(info).subscribe();

  }

}
