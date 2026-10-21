import { tracks } from "../../Data/track/tracks"
import type { Track } from "../../Interfices/Track";

const totalTracks: number = tracks.length;
const random: number = Math.floor(Math.random() * totalTracks);
const track: Track = tracks[random];


const SongCerd = () => {
    return (
        <>
            <h1> {track.tittle}</h1>
            <p>{track.artist}</p>
            <p> {track.duration}</p>
        </>
    )
}
export default SongCerd