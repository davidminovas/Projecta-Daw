import { randomUUID } from "crypto";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PlayListTracksBd } from "../interfaces/playListTrack/playListTrackBD";
import { PlayListTrack } from "../interfaces/playListTrack/playListTracks";
import { isValidPlayListTrack } from "../validators/playListTrackValidator";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { PlayListTracks } from "../interfaces/data/playListTrack/playListTracks";

export function createPlayListTrack(playListTracks: PlayListTrack): CreateSuccessService<PlayListTracksBd> | ErrorService {

    if (!isValidPlayListTrack(playListTracks)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const playListTracksRecord: PlayListTracksBd = {
        id: uuid,
        playList: playListTracks.playList.trim().replace(/\s+/g, " "),
        track: playListTracks.track.trim().replace(/\s+/g, " "),

    };

    return { success: true, code: 201, data: playListTracksRecord }
}

export function deletePlayListTrack(idPlayListTrack: string): DeletSuccessService | ErrorService{
  
    const index: number = PlayListTracks.findIndex((t: PlayListTracksBd) => { return t.id === idPlayListTrack; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    return { success: true, code: 204, index: index};
}