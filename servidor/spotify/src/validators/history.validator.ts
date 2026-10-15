
import { tracks } from "../interfaces/data/track/tracks";
import { Users } from "../interfaces/data/user/dataUser";
import { History } from "../interfaces/history/history";
import { TrackBD } from "../interfaces/track/trackBD";
import { UserBD } from "../interfaces/user/userBD";



export function isValidHistori(histori: History): boolean {


    if (histori.id === null || histori.track === null || histori.user === null || isNaN(histori.data.getTime())) {
        return false;
    }
  
    const trackOk: TrackBD | undefined = tracks.find(
        (c: TrackBD) => {
            return c.id === histori.track
        }
    );
    const userOk: UserBD | undefined = Users.find(
        (c: UserBD) => {
            return c.id === histori.user
        }
    );
    
    if (!trackOk || !userOk) {
            return false;
        }
    return true;
}