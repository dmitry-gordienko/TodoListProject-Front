import { itemStatusEnum } from "../enums/item-status-filter.enum";

export interface IItemsFilterRequest {
    todoListId: number;
    textFilter: string;
    statusFilter: itemStatusEnum;
}