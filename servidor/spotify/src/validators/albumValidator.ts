import { Album } from "../interfaces/album/album";
import { MAXARTIST } from "../interfaces/album/albumConst";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../interfaces/data/artist/artists.data";

export function validatorAlbum(album: Album): boolean {
    if (!album) {
        return false;
    }

    if (album.artist === null || isNaN(album.data.getTime())) {
        return false;
    }


    const longArtist: number = album.artist.trim().replace(/\s+/g, " ").length;
  


    if (longArtist === 0 || longArtist > MAXARTIST) { return false }



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