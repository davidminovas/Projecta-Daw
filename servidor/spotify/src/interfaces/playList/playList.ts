import { User } from "../user/user";

export interface PlayList{
    id: string;
    tittle: string;
    user: User; //FK
}