"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUser = isValidUser;
const dataCountrys_1 = require("../interfaces/data/country/dataCountrys");
const userConst_1 = require("../interfaces/user/userConst");
function isValidUser(user) {
    if (user.id === null || user.email === null) {
        return false;
    }
    const longEmail = user.email.trim().replace(/\s+/g, " ").length;
    if (longEmail === 0 || longEmail > userConst_1.MAXEMAIL) {
        return false;
    }
    const CountryOk = dataCountrys_1.Countrys.find((c) => {
        return c.id === user.country;
    });
    if (!CountryOk) {
        return false;
    }
    return true;
}
