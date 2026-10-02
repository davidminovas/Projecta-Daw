import { Artist } from "./artist";

export interface Track {
    title: string;
    artist: Artist;
    duration: number;
}