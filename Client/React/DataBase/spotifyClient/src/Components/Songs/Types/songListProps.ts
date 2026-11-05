import type { GetTrack } from "../../../APIManagement/Tracks/Interfaces/Track";



export interface SongListProps {
    tracks:GetTrack[];
    time: (duration: number) => string;
}