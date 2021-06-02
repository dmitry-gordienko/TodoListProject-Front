import { Injectable } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerServiceService {
  
  defaultSpinner: Spinner = {
    type: 'square-jelly-box',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, .5)',
        color: 'white',
        fullScreen: true
  };

  constructor(
    private spinner: NgxSpinnerService
  ) { }

  Show()
  {
    this.spinner.show(undefined, this.defaultSpinner);
  }

  Hide()
  {
    this.spinner.hide();
  }

  async HideWithDelay(milliseconds: number = 1000)
  {
    setTimeout(() =>
    {
      this.Hide();
    },
    milliseconds);
    await this.Delay(milliseconds);
    return this.Hide();
  }
  
  Delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
