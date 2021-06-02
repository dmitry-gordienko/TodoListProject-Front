import { Injectable } from '@angular/core';
import { ConfigurationService } from '../common/configuration.service';

export interface ITodoList {
  id: number;
  name: string;
  totalItemsCount: number;
  doneItemsCount: number;
}


@Injectable({
  providedIn: 'root'
})
export class TodoListsService {

  constructor(
    private config: ConfigurationService,
  ) { }






}
