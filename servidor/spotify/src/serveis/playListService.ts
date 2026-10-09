import { randomUUID } from "crypto";
import { PlayLists } from "../interfaces/data/playList/playLists";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PlayList } from "../interfaces/playList/playList";
import { PlayListBd } from "../interfaces/playList/playListBD";
import { isValidPlayList } from "../validators/playList.validator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";

export function createPlayList(pL: PlayList): CreateSuccessService<PlayListBd> | ErrorService {

    if (!isValidPlayList(pL)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const playListRecord: PlayListBd = {
        id: uuid,
        tittle: pL.tittle.trim().replace(/\s+/g, " "),
        user: pL.user.trim().replace(/\s+/g, " "),
    };

    PlayLists.push(playListRecord);

    return { success: true, code: 201, data: playListRecord }
}

export function getPlayListById(idPlaylist: string): PlayListBd | undefined {

    return PlayLists.find(
        (t: PlayListBd) => { return t.id === idPlaylist }
    );

};

export function substitPlayList(pl: PlayList, idPlaylist:string): PutSuccessService<PlayListBd> | ErrorService {
  

    if (!isValidPlayList(pl)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = PlayLists.findIndex(
        (t: PlayListBd) => { return t.id === idPlaylist; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    const updateArtist: PlayListBd = {
        id: idPlaylist,
        tittle: pl.tittle.trim().replace(/\s+/g, " "),
        user: pl.user.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 200, index: index, data: updateArtist };
}

export function deletePlayList(idPlaylist: string): DeletSuccessService | ErrorService{
  
    const index: number = PlayLists.findIndex((t: PlayListBd) => { return t.id === idPlaylist; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    return { success: true, code: 204, index: index};
}