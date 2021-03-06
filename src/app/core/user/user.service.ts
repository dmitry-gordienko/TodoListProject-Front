import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from "../../../environments/environment";
import { Observable } from 'rxjs';
import { HttpService } from "../http/http.service";
import { IUserProfileUpdateRequest } from './models/user-profile-update-request.model';
import { IUserFullModel } from './models/user-full.model';
import { AvatarService } from './avatar/avatar.service';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _apiUrl: string = 'api/users';
    private _apiInfoUrl: string = this._apiUrl + '/info';
    private _apiAvatarUrl: string = this._apiUrl + '/avatar';

    //public avatarLink: string = '';

    public user!: IUserFullModel;

    @Output() userChange = new EventEmitter<IUserFullModel>();
    

    constructor(
        private httpService: HttpService,
        private avatarService: AvatarService,
    ) {
        this.initiateUser();
    }

    initUserData(userData: IUserFullModel) {
        //this.updateData(userData, this.currentUser);
        this.user = userData;
        this.user.avatar = this.avatarService.makeAvatarUrl(this.user.avatar);

        //this.avatarLink = this.avatarService.makeAvatarUrl(this.currentUser.avatar);
        this.userChange.emit(this.user);
    }

    submitUserInfo(data: IUserProfileUpdateRequest): Observable<IUserFullModel> {
        const body = this.httpService.mapToFormData(data);
        return this.httpService
            .request('patch', this._apiInfoUrl, { body: body })
            .pipe(
                map((data: IUserFullModel) => {
                    this.initUserData(data);
                })
            );
    }

    deleteAvatar(): Observable<IUserFullModel> {
        //this.user.avatar=undefined;
        return this.httpService
            .request('delete', this._apiAvatarUrl)
            .pipe(
                map((data: IUserFullModel) => {
                    this.initUserData(data);
                })
            );
    }
    
    /*    
    initiateUser(): Observable<IUserFullModel> {
        return this.httpService
            .request('get', this._apiInfoUrl)
            .pipe(
                map((data: IUserFullModel) => {
                    this.initUserData(data);
                })
            );
    }
    */
    initiateUser(): void {
        this.httpService
            .request('get', this._apiInfoUrl)
            .subscribe(
                (data: IUserFullModel) => {
                    this.initUserData(data);
                    console.log('user init result: ', data);
                });
    }

    updateData(sourceObj: any, destinationObj: any): void {
        
        const keys = Object.keys(sourceObj);

        for (let key of keys) {
            destinationObj[key] = sourceObj[key];
        }
    }
}
