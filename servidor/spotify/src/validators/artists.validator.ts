import { Artist } from "../interfaces/track/aartist";
import { MAXARTISTA, MAXCOUNTRY } from "../interfaces/track/track.constants";

export function validatorArtistCountry(artist: Artist): boolean {


    if (artist.country=== null || artist.artisticName===null || artist.name===null) {
        return false;
    }
    const longCountryt: number = artist.country.trim().replace(/\s+/g, " ").length;
    const longName: number = artist.name.trim().replace(/\s+/g, " ").length;
    const longNickName: number = artist.artisticName.trim().replace(/\s+/g, " ").length;

    if (longCountryt === 0 || longCountryt > MAXCOUNTRY) { return false }
    if (longName === 0 || longName > MAXARTISTA) { return false }
    if (longNickName === 0 || longNickName > MAXARTISTA) { return false }
    

    return true;
}