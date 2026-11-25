"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaylistTracksController = getPlaylistTracksController;
exports.getAllPlayListTrackController = getAllPlayListTrackController;
exports.postPlayListTrackController = postPlayListTrackController;
exports.deletePlayListTrackController = deletePlayListTrackController;
const playListTracksService_1 = require("../serveis/playListTracksService");
async function getPlaylistTracksController(req, res) {
    const playlistId = req.params.id;
    const tracks = await (0, playListTracksService_1.getTracksByPlaylistId)(playlistId);
    return res.status(200).json(tracks);
}
async function getAllPlayListTrackController(_req, res) {
    const playlists = await (0, playListTracksService_1.getAllPlayListTracks)();
    return res.status(200).json(playlists);
}
async function postPlayListTrackController(req, res) {
    const result = await (0, playListTracksService_1.createPlayListTrack)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function deletePlayListTrackController(req, res) {
    const result = await (0, playListTracksService_1.deletePlayListTrack)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
