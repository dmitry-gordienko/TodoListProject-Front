import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PopUpMessageService {

  constructor(
    private toastr: ToastrService
  ) { }

  ShowErrorMsg(title:string, msg:string)
  {
    this.toastr.error(msg, title, {
      timeOut:2000,
      extendedTimeOut: 2000,
      
    });
  }
}
