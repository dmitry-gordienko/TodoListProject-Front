export interface IUserFullModel {
    id: number;
    userName: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    avatar: string;
    createdAt: Date;
    lastAccessAt: Date;
    roles: string[];
}