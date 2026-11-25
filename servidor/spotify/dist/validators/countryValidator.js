"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidCountry = isValidCountry;
const constCountry_1 = require("../interfaces/country/constCountry");
function isValidCountry(country) {
    if (country.id === null || country.name === null) {
        return false;
    }
    const longCountry = country.name.trim().replace(/\s+/g, " ").length;
    if (longCountry === 0 || longCountry > constCountry_1.MAXCOUNTRY) {
        return false;
    }
    return true;
}
