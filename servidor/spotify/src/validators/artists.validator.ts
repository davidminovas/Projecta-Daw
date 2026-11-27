import { Artist } from "../interfaces/artist/artist";
import { MAXARTISTA } from "../interfaces/artist/artist.constants";
import { getCountryById } from "../serveis/countryService";



export async function validatorArtist(artist: Artist): Promise<boolean> {
    if (!artist) {
        return false;
    }

    if (
        typeof artist.country !== "string" ||
        typeof artist.artisticName !== "string" ||
        typeof artist.name !== "string" ||
        !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(artist.country)
    ) {
        return false;
    }


    const longName: number = artist.name.trim().replace(/\s+/g, " ").length;
    const longNickName: number = artist.artisticName.trim().replace(/\s+/g, " ").length;


    if (longName === 0 || longName > MAXARTISTA) { return false }
    if (longNickName === 0 || longNickName > MAXARTISTA) { return false }



    const country = await getCountryById(artist.country);
    return country.success;

}