
import { History } from "../interfaces/history/history";



export function isValidHistori(histori: History): boolean {


    if (histori.id === null || histori.track === null || histori.user === null || isNaN(histori.data.getTime())) {
        return false;
    }
    if ( histori.track===) {return false}

    return true;
}