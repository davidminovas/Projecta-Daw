import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../interfaces/data/artist/artists.data";
import { Track } from "../interfaces/track/track";
import { MAXARTISTA, MAXTITOL } from "../interfaces/track/track.constants";

export function isValidTrack(track: Track): boolean {


    if (track.title === null || track.artist === null || track.duration === null) {
        return false;
    }
    const longTitol: number = track.title.trim().replace(/\s+/g, " ").length;
    const longArtist: number = track.artist.trim().replace(/\s+/g, " ").length;

    if (longArtist === 0 || longArtist > MAXARTISTA) { return false }
    if (longTitol === 0 || longTitol > MAXTITOL) { return false }
    if (track.duration < 1) { return false }

    const ArtistOk: ArtistBD | undefined = artists.find(
        (c: ArtistBD) => {
            return c.id === track.artist
        }
    );

    if (!ArtistOk) {
        return false;
    }
    return true
}