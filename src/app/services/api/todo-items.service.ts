import { Injectable } from '@angular/core';

export interface ITodoItem {
  id: number;
  name: string;
  todoListId: number;
  isDone: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoItemsService {

  constructor() { }
}
