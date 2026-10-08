import { randomUUID } from "crypto";
import { Country } from "../interfaces/country/country";
import { CountryBD } from "../interfaces/country/countryBD";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { isValidCountry } from "../validators/countryValidator";
import { Countrys } from "../interfaces/data/country/dataCountrys";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";


export function getCountryById(idCountry: string): CountryBD | undefined {

    return Countrys.find(
        (t: CountryBD) => { return t.id === idCountry }
    );

};

export function createCountry(country: Country): CreateSuccessService<CountryBD> | ErrorService {

    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const countryRecord: CountryBD = {
        id: uuid,
        name: country.name.trim().replace(/\s+/g, " "),
    };

    Countrys.push(countryRecord);

    return { success: true, code: 201, data: countryRecord }
}

export function substitCountry(country: Country, idCountry:string): PutSuccessService<CountryBD> | ErrorService {
  

    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = Countrys.findIndex(
        (t: CountryBD) => { return t.id === idCountry; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    const updateArtist: CountryBD = {
        id: idCountry,
        name: country.name.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 200, index: index, data: updateArtist };
}