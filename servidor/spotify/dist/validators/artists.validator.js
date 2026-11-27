"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorArtist = validatorArtist;
const artist_constants_1 = require("../interfaces/artist/artist.constants");
const countryService_1 = require("../serveis/countryService");
async function validatorArtist(artist) {
    if (!artist) {
        return false;
    }
    if (typeof artist.country !== "string" ||
        typeof artist.artisticName !== "string" ||
        typeof artist.name !== "string" ||
        !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(artist.country)) {
        return false;
    }
    const longName = artist.name.trim().replace(/\s+/g, " ").length;
    const longNickName = artist.artisticName.trim().replace(/\s+/g, " ").length;
    if (longName === 0 || longName > artist_constants_1.MAXARTISTA) {
        return false;
    }
    if (longNickName === 0 || longNickName > artist_constants_1.MAXARTISTA) {
        return false;
    }
    const country = await (0, countryService_1.getCountryById)(artist.country);
    return country.success;
}
