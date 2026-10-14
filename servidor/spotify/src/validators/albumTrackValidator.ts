import { AlbumBD } from "../interfaces/album/albumBD";
import { AlbumTrack } from "../interfaces/albumTrack/albumTrack";
import { Albums } from "../interfaces/data/album/albums";

export function validatorAlbumTrack(albumTrack: AlbumTrack): boolean {
    if (!albumTrack) {
        return false;
    }


    const albumOk: AlbumBD | undefined = Albums.find(
        (c: AlbumBD) => {
            return c.id === albumTrack.album
        }
    );

    const trackOk: AlbumBD | undefined = Albums.find(
        (c: AlbumBD) => {
            return c.id === albumTrack.track
        }
    );

    if (!albumOk || !trackOk) {
        return false;
    }
    return true;

}