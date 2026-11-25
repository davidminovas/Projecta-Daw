"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatorAlbumTrack = validatorAlbumTrack;
const albums_1 = require("../interfaces/data/album/albums");
function validatorAlbumTrack(albumTrack) {
    if (!albumTrack) {
        return false;
    }
    const albumOk = albums_1.Albums.find((c) => {
        return c.id === albumTrack.album;
    });
    const trackOk = albums_1.Albums.find((c) => {
        return c.id === albumTrack.track;
    });
    if (!albumOk || !trackOk) {
        return false;
    }
    return true;
}
