import { Track } from "../track/track";
import { PlayList } from "./playList";

export interface PlayListTracks{
    id: string;
    playList: PlayList;//FK
    track: Track; //FK
}