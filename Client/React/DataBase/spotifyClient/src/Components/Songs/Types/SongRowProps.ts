import type { Track } from "../../../Model/Track";


export interface SongRowProps {

    edit?: (t: Track) => void
    tittle: string;
    artist: string;
    duration: number;
    id: string;
    artist_id: string;

}