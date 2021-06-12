import { Injectable } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { HttpService } from "../http/http.service";
import { IUserProfileUpdateRequest } from './models/user-profile-update-request.model';
import { IUserFullModel } from './models/user-full.model';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _apiUrl: string = 'api/users';
    private _apiInfoUrl: string = this._apiUrl + '/info';

    public currentUser?: IUserFullModel;

    //public rnd:number = 0;

    constructor(
        private httpService: HttpService,
    ) {

        //this.rnd=Math.random();
        //console.log(this.rnd);
        this.initiateUser();
    }

    submitUserInfo(data: IUserProfileUpdateRequest): Observable<any> {
        const body = this.httpService.mapToFormData(data);
        return this.httpService.request('patch', this._apiInfoUrl, { body: body });
    }

    getUserInfo(): Observable<any> {
        return this.httpService.request('get', this._apiInfoUrl);
    }

    


    initiateUser(): void {
        return this.httpService
            .request('get', this._apiInfoUrl)
            .subscribe(
                (data: IUserFullModel) => {
                    this.currentUser = data;
                    /*
                    this.rnd = Math.random();
                    console.log(this.rnd);
                    */
                    console.log('user init result: ', data);
                    
                }/*,
                error => {
                    this.popUpMsg.showErrorMsg('Error', "Something wrong");
                }*/);
    }

    /*
    getListsCollection(): Observable<ITodoList[]> {
        return this.httpService.request('get', this._apiUrl);
    }

    createNewList(newListName: string): Observable<ITodoList> {
        const body = new FormData();
        body.append('name', newListName);

        return this.httpService.request('post', this._apiUrl, { body: body });
    }

    sendByEmail(listId: number): Observable<any> {
        const url = this._apiUrl + `/${listId}/sendByEmail`;
        return this.httpService.request('post', url);
    }

    deleteList(listId: number): Observable<any> {
        const url = this._apiUrl + `/${listId}`;
        return this.httpService.request('delete', url);
    }
    */

}
