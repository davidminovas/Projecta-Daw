import { Track } from "../track/track";
import { User } from "../user/user";

export interface History{
    id: string;
    user: User; //FK
    track: Track; //FK
    data: Date;
}