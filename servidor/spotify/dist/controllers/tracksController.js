"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTracksController = getAllTracksController;
exports.getTrackByIdController = getTrackByIdController;
exports.postTrackController = postTrackController;
exports.putTrackController = putTrackController;
exports.deleteTrackController = deleteTrackController;
exports.postTrackUserHistoryController = postTrackUserHistoryController;
const histroyService_1 = require("../serveis/histroyService");
const trackService_1 = require("../serveis/trackService");
async function getAllTracksController(_req, res) {
    const tracks = await (0, trackService_1.getAllTracks)();
    return res.status(200).json(tracks);
}
async function getTrackByIdController(req, res) {
    const findTrack = await (0, trackService_1.getTrackById)(req.params.id);
    if (!findTrack.success) {
        return res.status(findTrack.code).json({ message: findTrack.message });
    }
    return res.status(findTrack.code).json(findTrack);
}
;
async function postTrackController(req, res) {
    const result = await (0, trackService_1.createTrack)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function putTrackController(req, res) {
    const result = await (0, trackService_1.substitTrack)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function deleteTrackController(req, res) {
    const result = await (0, trackService_1.deleteTrack)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
async function postTrackUserHistoryController(req, res) {
    const result = await (0, histroyService_1.addTrackUserHistory)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
