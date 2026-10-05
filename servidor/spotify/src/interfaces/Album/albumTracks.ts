import { Track } from "../track/track";
import { Album } from "./album";

export interface AlbumTracks{
    id: string;
    album: Album; //FK
    track: Track; //FK
}