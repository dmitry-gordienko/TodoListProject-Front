import { Component, Input } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { IUserFullModel } from 'src/app/core/user/models/user-full.model';
import { UserService } from 'src/app/core/user/user.service';
import { PopUpMessageService } from 'src/app/shared/pop-up-message/pop-up-message.service';

@Component({
    selector: 'avatar-manager',
    templateUrl: './avatar-manager.component.html'
})
export class AvatarManagerComponent {
    closeResult = '';

    @Input() user!: IUserFullModel;

    constructor(
        private modalService: NgbModal,
        private popUpMsg: PopUpMessageService,
        private userService: UserService,) { }

    open(content: any) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    deleteAvatar() {
        this.userService.deleteAvatar()
            .subscribe(
                (data: IUserFullModel) => {
                    this.user = this.userService.user!;
                    this.popUpMsg.showSuccessMsg('Success', "Avatar deleted.");
                },
                error => {
                    this.popUpMsg.showErrorMsg('Error', "Error deleting avatar.");
                });

    }



}