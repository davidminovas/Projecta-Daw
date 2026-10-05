import { Artist } from "../interfaces/artist/artist";
import { MAXARTISTA } from "../interfaces/artist/artist.constants";
import { COUNTRYS } from "../interfaces/data/track/pais.data";


export function validatorArtistCountry(artist: Artist): boolean {


    if (artist.country === null || artist.artisticName === null || artist.name === null) {
        return false;
    }

    const longName: number = artist.name.trim().replace(/\s+/g, " ").length;
    const longNickName: number = artist.artisticName.trim().replace(/\s+/g, " ").length;


    if (longName === 0 || longName > MAXARTISTA) { return false }
    if (longNickName === 0 || longNickName > MAXARTISTA) { return false }

    const paisTrobat: string|undefined = COUNTRYS.find(
        (p: string) => { return p === artist.country.toUpperCase() }
    )
    if (!paisTrobat) { return false; }
    else { return true; }
    
}