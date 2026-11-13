export interface Likes {

    user: string; //FK
    track: string; //FK
    date: Date;
    liketrack: number;
}