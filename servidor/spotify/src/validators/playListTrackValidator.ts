import { PlayLists } from "../interfaces/data/playList/playLists";
import { tracks } from "../interfaces/data/track/tracks";
import { PlayListBd } from "../interfaces/playList/playListBD";
import { MAXTRACK } from "../interfaces/playListTrack/playListTrackConst";
import { PlayListTrack } from "../interfaces/playListTrack/playListTracks";
import { TrackBD } from "../interfaces/track/trackBD";

export function isValidPlayListTrack(playListTracks: PlayListTrack): boolean {


    if (playListTracks.track === null || playListTracks.playList === null) {
        return false;
    }
    const longTrack: number = playListTracks.track.trim().replace(/\s+/g, " ").length;


    if (longTrack === 0 || longTrack > MAXTRACK) { return false }


   const playListOk: PlayListBd | undefined = PlayLists.find(
       (c: PlayListBd) => {
               return c.id === playListTracks.playList
           }
    );
    
    const TrackOk: TrackBD | undefined = tracks.find(
        (c: TrackBD) => {
            return c.id === playListTracks.track
        }
    );
   
    if (!playListOk || !TrackOk) {
           return false;
    }
    
       return true;
}