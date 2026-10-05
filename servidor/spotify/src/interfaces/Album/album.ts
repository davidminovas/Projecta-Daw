import { Artist } from "../artist/artist";

export interface Album{
    id: string;
    artist: Artist; //FK
    data: Date;
}