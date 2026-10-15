import { Users } from "../interfaces/data/user/dataUser";
import { MAXTITLE, MAXUSER } from "../interfaces/playList/constPlayList";
import { PlayList } from "../interfaces/playList/playList";
import { UserBD } from "../interfaces/user/userBD";

export function isValidPlayList(pl: PlayList): boolean {


    if (pl.id === null || pl.tittle === null || pl.user === null) {
        return false;
    }
    const longTitol: number = pl.tittle.trim().replace(/\s+/g, " ").length;
    const longUser: number = pl.user.trim().replace(/\s+/g, " ").length;

    if (longUser === 0 || longUser > MAXUSER) { return false }
    if (longTitol === 0 || longTitol > MAXTITLE) { return false }

        const userOk: UserBD | undefined = Users.find(
            (c: UserBD) => {
                return c.id === pl.user
            }
        );
    
    if (!userOk) {
            return false;
        }
        return true;
}