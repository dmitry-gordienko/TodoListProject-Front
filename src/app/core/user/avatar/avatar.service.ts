import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AvatarService {

    private _avatarHostUrl: string = environment.hostUrl + 'data/avatars';
    private _avatarFileExt: string = '.png';
    private _avatarDefaultFilename: string = 'default';

    constructor(
    ) {

    }

    makeAvatarUrl(avatar:string | undefined):string | undefined{
        if(avatar){
            return `${this._avatarHostUrl}/${avatar}${this._avatarFileExt}`;
        }
        //return `${this._avatarHostUrl}/${this._avatarDefaultFilename}${this._avatarFileExt}`;
        return undefined;
    }

    
}