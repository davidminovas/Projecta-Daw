import type { TrackCreate } from "../../../APIManagement/Tracks/Interfaces/TtrackCreate";
import type { Track } from "../../../Model/Track";

export interface AddSongFromProps {
    submit: (t: TrackCreate) => void;
    song?: Track;
}