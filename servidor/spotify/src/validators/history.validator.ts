
import { History } from "../interfaces/history/history";



export function isValidHistori(histori: History): boolean {

    if (!histori) {
        return false;
    }
    if ( histori.track === null || histori.user === null) {
        return false;
    }
  

    return true;
}