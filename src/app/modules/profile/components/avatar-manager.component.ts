import { Component, Input } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { HttpService } from 'src/app/core/http/http.service';
import { IUserFullModel } from 'src/app/core/user/models/user-full.model';
import { UserService } from 'src/app/core/user/user.service';
import { PopUpMessageService } from 'src/app/shared/pop-up-message/pop-up-message.service';
import { ImageUploadModel } from '../../../core/http/models/image-upload.model';


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
        private userService: UserService,
        private httpService: HttpService
        ) { }

    open(content: any) {

        this.cropImgPreview = "";
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            ///debugger;
            let data = this.prepareUploadImageData(result)
            console.log(data);
            this.cropImgPreview = '';
            this.userService.uploadAvatar(data);
            //this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            //this.cropImgPreview = '';
            //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    prepareUploadImageData(input: string): ImageUploadModel{
        let uploadData = new ImageUploadModel();
        //debugger;
        let tmp = input.split(',');
        uploadData.data = tmp[1];
        
        tmp = tmp[0].split(';');
        uploadData.encoding = tmp[1];

        tmp = tmp[0].split('/');
        uploadData.format = tmp[1];
        
        return uploadData
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

    imgChangeEvt: any = "";
    cropImgPreview: any = "";

    onFileChange(event: any): void {
        console.log('onFileChange');
        //debugger;
        this.imgChangeEvt = event;
    }
    cropImg(e: ImageCroppedEvent) {

        //debugger;
        console.log('cropp event');
        console.log(e);
        //let ev = e as ImageCroppedEvent;
        this.cropImgPreview = e.base64;
    }

    imgLoad() {
        console.log('img loaded');
        // display cropper tool
    }

    initCropper() {
        console.log('cropper init');
        // init cropper
    }

    imgFailed() {
        console.log('img fail');
        // error msg
    }



}