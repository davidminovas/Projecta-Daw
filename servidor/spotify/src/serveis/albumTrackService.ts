import { randomUUID } from "crypto";
import { AlbumTrack } from "../interfaces/albumTrack/albumTrack";
import { AlbumTrackBD } from "../interfaces/albumTrack/albumTrackBD";
import { AlbumTracks } from "../interfaces/data/albumTrack/albumsTracks";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { validatorAlbumTrack } from "../validators/albumTrackValidator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";

export function getAlbumTrackById(idAlbumTrack: string): AlbumTrackBD | undefined {

    return AlbumTracks.find(
        (t: AlbumTrackBD) => { return t.id === idAlbumTrack }
    );

};

export function createAlbumTrack(albumTrack: AlbumTrack): CreateSuccessService<AlbumTrackBD> | ErrorService {

    if (!validatorAlbumTrack(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const albumTrackRecord: AlbumTrackBD = {
   
        id: uuid,
        album: albumTrack.album.trim().replace(/\s+/g, " "),
        track: albumTrack.track.trim().replace(/\s+/g, " "),
    };

    AlbumTracks.push(albumTrackRecord);

    return { success: true, code: 201, data: albumTrackRecord }
}

export function substitAlbumTrack(albumTrack: AlbumTrack, idAlbumTrack: string): PutSuccessService<AlbumTrackBD> | ErrorService {


    if (!validatorAlbumTrack(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = AlbumTracks.findIndex(
        (t: AlbumTrackBD) => { return t.id === idAlbumTrack; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    const updateArtist: AlbumTrackBD = {
        id: idAlbumTrack,
        album: albumTrack.album.trim().replace(/\s+/g, " "),
        track: albumTrack.track.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 200, index: index, data: updateArtist };
}