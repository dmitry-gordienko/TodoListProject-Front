export interface IUserFullModel {
    id: number;
    username: string;
    email: string;
    password: string;
    name: string;
    surname: string;
    avatar?: string;
    createdAt: Date;
    lastAccessAt: Date;
    roles: string[];
}