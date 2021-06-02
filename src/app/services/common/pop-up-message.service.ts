import { Component, Injectable } from '@angular/core';
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
      timeOut: 3000,
      extendedTimeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing'
    });
  }

  ShowErrorMsgOnComponent(title:string, msg:string, component:Component)
  {
    this.toastr.error(msg, title, {
      timeOut: 3000,
      extendedTimeOut: 2000,
      progressBar: true,
      progressAnimation: 'decreasing'      
    });
  }
}

