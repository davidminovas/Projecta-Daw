"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPlayList = isValidPlayList;
const dataUser_1 = require("../interfaces/data/user/dataUser");
const constPlayList_1 = require("../interfaces/playList/constPlayList");
function isValidPlayList(pl) {
    if (pl.id === null || pl.tittle === null || pl.user === null) {
        return false;
    }
    const longTitol = pl.tittle.trim().replace(/\s+/g, " ").length;
    const longUser = pl.user.trim().replace(/\s+/g, " ").length;
    if (longUser === 0 || longUser > constPlayList_1.MAXUSER) {
        return false;
    }
    if (longTitol === 0 || longTitol > constPlayList_1.MAXTITLE) {
        return false;
    }
    const userOk = dataUser_1.Users.find((c) => {
        return c.id === pl.user;
    });
    if (!userOk) {
        return false;
    }
    return true;
}
