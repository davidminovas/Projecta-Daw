"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorAlbum = validatorAlbum;
const albumConst_1 = require("../interfaces/album/albumConst");
const artists_data_1 = require("../interfaces/data/artist/artists.data");
function validatorAlbum(album) {
    if (!album) {
        return false;
    }
    if (album.title === null || isNaN(album.data.getTime())) {
        return false;
    }
    const longTitle = album.title.trim().replace(/\s+/g, " ").length;
    if (longTitle === 0 || longTitle > albumConst_1.MAXTITLE) {
        return false;
    }
    const artistOk = artists_data_1.artists.find((c) => {
        return c.id === album.artist;
    });
    if (!artistOk) {
        return false;
    }
    return true;
}
