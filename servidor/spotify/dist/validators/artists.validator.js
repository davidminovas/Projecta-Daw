"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorArtist = validatorArtist;
const artist_constants_1 = require("../interfaces/artist/artist.constants");
const dataCountrys_1 = require("../interfaces/data/country/dataCountrys");
function validatorArtist(artist) {
    if (!artist) {
        return false;
    }
    if (artist.country === null || artist.artisticName === null || artist.name === null) {
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
    const countriOk = dataCountrys_1.Countrys.find((c) => {
        return c.id === artist.country;
    });
    if (!countriOk) {
        return false;
    }
    return true;
}
