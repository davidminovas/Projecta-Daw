"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAlbumTrackController = postAlbumTrackController;
exports.deleteAlbumTrackController = deleteAlbumTrackController;
const albumTrackService_1 = require("../serveis/albumTrackService");
async function postAlbumTrackController(req, res) {
    const result = await (0, albumTrackService_1.createAlbumTrack)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function deleteAlbumTrackController(req, res) {
    const result = await (0, albumTrackService_1.deleteArtistTrack)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
