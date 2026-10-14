import { randomUUID } from "crypto";
import { Album } from "../interfaces/album/album";
import { AlbumBD } from "../interfaces/album/albumBD";
import { Artist } from "../interfaces/artist/artist";
import { Albums } from "../interfaces/data/album/albums";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { validatorAlbum } from "../validators/albumValidator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";

export function getAlbumById(idAlbum: string): AlbumBD | undefined {

    return Albums.find(
        (t: AlbumBD) => { return t.id === idAlbum }
    );

};

export function createAlbum(album: Album): CreateSuccessService<AlbumBD> | ErrorService {

    if (!validatorAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const albumRecord: AlbumBD = {
        id: uuid,
        title: album.title.trim().replace(/\s+/g, " "),
        artist: album.artist.trim().replace(/\s+/g, " "),
        data: new Date,
    };

    Albums.push(albumRecord);

    return { success: true, code: 201, data: albumRecord }
}

export function substitAlbum(album: Album, idAlbum: string): PutSuccessService<AlbumBD> | ErrorService {


    if (!validatorAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = Albums.findIndex(
        (t: AlbumBD) => { return t.id === idAlbum; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    const updateArtist: AlbumBD = {
        id: idAlbum,
        title: album.title.trim().replace(/\s+/g, " "),
        artist: album.artist.trim().replace(/\s+/g, " "),
        data: new Date,
    };

    return { success: true, code: 200, index: index, data: updateArtist };
}

export function deleteAlbum(idAlbum: string): DeletSuccessService | ErrorService {

    const index: number = Albums.findIndex((t: AlbumBD) => { return t.id === idAlbum; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    return { success: true, code: 204, index: index };
}