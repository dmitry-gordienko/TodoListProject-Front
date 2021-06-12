import { Injectable } from '@angular/core';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

@Injectable({
    providedIn: 'root'
})
export class SpinnerService {

    defaultSpinner: Spinner = {
        type: 'square-jelly-box',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, .5)',
        color: 'black',
        fullScreen: false
    };

    constructor(
        private spinner: NgxSpinnerService
    ) { }

    show() {
        this.spinner.show(undefined, this.defaultSpinner);
    }

    hide() {
        this.spinner.hide();
    }

    async hideWithDelay(milliseconds: number = 1000) {
        setTimeout(() => {
            this.hide();
        },
            milliseconds);
        await this.delay(milliseconds);
        return this.hide();
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
