import type { GetTrack } from "../../../APIManagement/Tracks/Interfaces/Track";
import type { Track } from "../../../Model/Track";



export interface SongListProps {
    tracks: GetTrack[];
    edit?: (t: Track) => void;

}