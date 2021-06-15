import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AvatarManagerComponent } from './avatar-manager.component';

@NgModule({
  imports: [NgbModule],
  declarations: [AvatarManagerComponent],
  exports: [AvatarManagerComponent],
  bootstrap: [AvatarManagerComponent]
})
export class NgbdModalBasicModule {}
