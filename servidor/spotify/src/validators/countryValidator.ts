import { MAXCOUNTRY } from "../interfaces/country/constCountry";
import { Country } from "../interfaces/country/country";

export function isValidCountry(country: Country): boolean {


    if (country.id === null || country.name === null) {
        return false;
    }
    const longCountry: number = country.name.trim().replace(/\s+/g, " ").length;
    if (longCountry === 0 || longCountry > MAXCOUNTRY) { return false }
    return true;
}