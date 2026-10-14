
import { tracks } from "../interfaces/data/track/tracks";
import { History } from "../interfaces/history/history";
import { TrackBD } from "../interfaces/track/trackBD";



export function isValidHistori(histori: History): boolean {


    if (histori.id === null || histori.track === null || histori.user === null || isNaN(histori.data.getTime())) {
        return false;
    }
  
    const trackOk: TrackBD | undefined = tracks.find(
        (c: TrackBD) => {
            return c.id === histori.track
        }
        );
    
    if (!trackOk) {
            return false;
        }
    return true;
}