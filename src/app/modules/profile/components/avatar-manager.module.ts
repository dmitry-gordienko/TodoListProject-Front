import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AvatarManagerComponent } from './avatar-manager.component';

@NgModule({
    imports: [NgbModule,
        ImageCropperModule],
    //schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [
        AvatarManagerComponent,
    ],
    exports: [AvatarManagerComponent],
    bootstrap: [AvatarManagerComponent]
})
export class AvatarManagerModule { }
