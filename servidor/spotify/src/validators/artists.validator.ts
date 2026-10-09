import { Artist } from "../interfaces/artist/artist";
import { MAXARTISTA } from "../interfaces/artist/artist.constants";
import { CountryBD } from "../interfaces/country/countryBD";
import { Countrys } from "../interfaces/data/country/dataCountrys";



export function validatorArtistCountry(artist: Artist): boolean {
    if (!artist) {
        return false;
    }

    if (artist.country === null || artist.artisticName === null || artist.name === null) {
        return false;
    }


    const longName: number = artist.name.trim().replace(/\s+/g, " ").length;
    const longNickName: number = artist.artisticName.trim().replace(/\s+/g, " ").length;


    if (longName === 0 || longName > MAXARTISTA) { return false }
    if (longNickName === 0 || longNickName > MAXARTISTA) { return false }



    const countriOk: CountryBD | undefined = Countrys.find(
        (c: CountryBD) => (c.id === artist.country)
    );

    if (!countriOk) {
        return false;
    }
    return true;

}