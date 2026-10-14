import { Album } from "../interfaces/album/album";
import { MAXTITLE } from "../interfaces/album/albumConst";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../interfaces/data/artist/artists.data";

export function validatorAlbum(album: Album): boolean {
    if (!album) {
        return false;
    }

    if (album.title === null || isNaN(album.data.getTime())) {
        return false;
    }


    const longTitle: number = album.title.trim().replace(/\s+/g, " ").length;
  


    if (longTitle === 0 || longTitle > MAXTITLE) { return false }



    const artistOk: ArtistBD | undefined = artists.find(
        (c: ArtistBD) => {
            return c.id === album.artist
        }
    );

    if (!artistOk) {
        return false;
    }
    return true;

}