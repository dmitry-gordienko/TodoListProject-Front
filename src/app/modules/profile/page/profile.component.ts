import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { PopUpMessageService } from 'src/app/shared/pop-up-message/pop-up-message.service';
import { IUserFullModel } from "../../../core/user/models/user-full.model";
import { IUserProfileUpdateRequest } from "../../../core/user/models/user-profile-update-request.model";
import { UserService } from "../../../core/user/user.service";
import { environment } from "../../../../environments/environment";

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

    user!: IUserFullModel;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private popUpMsg: PopUpMessageService,
        private userService: UserService,
    ) { }

    ngOnInit(): void {
        this.initComponentData();
        //console.log('profile onInit: ', this.currentUser);
    }

    initComponentData() {
        this.user = this.userService.user!;
        this.userInfoForm.patchValue({
            username: this.user!.username,
            name: this.user!.name,
            surname: this.user!.surname,
        });
    }
/*
    deleteAvatar() {
        this.userService.deleteAvatar()
            .subscribe(
                (data: IUserFullModel) => {
                    this.initComponentData();
                    this.popUpMsg.showSuccessMsg('Success', "Avatar deleted.");
                },
                error => {
                    this.popUpMsg.showErrorMsg('Error', "Error deleting avatar.");
                });

    }
*/
    onInfoSubmit() {
        let info: IUserProfileUpdateRequest = {
            username: this.userInfoForm.get('username')!.value,
            name: this.userInfoForm.get('name')!.value,
            surname: this.userInfoForm.get('surname')!.value,
        };

        this.userService.submitUserInfo(info)
            .subscribe(
                (data: any) => {
                    this.initComponentData();
                    this.popUpMsg.showSuccessMsg('Success', "Profile saved.");
                },
                error => {
                    this.popUpMsg.showErrorMsg('Error', "Error saving profile.");
                }
                );

    }

/*
    public isModalDialogVisible: boolean = false;

	public showDialog() {
		this.isModalDialogVisible = true;
	}

	public closeModal(isConfirmed: boolean) {
		this.isModalDialogVisible = false;
	}
*/

}
