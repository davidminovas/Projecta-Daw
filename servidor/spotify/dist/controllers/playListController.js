"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlaylistController = getAllPlaylistController;
exports.getPLByIdController = getPLByIdController;
exports.postPLController = postPLController;
exports.putPLController = putPLController;
exports.deletePLController = deletePLController;
const playListService_1 = require("../serveis/playListService");
async function getAllPlaylistController(_req, res) {
    const playlists = await (0, playListService_1.getAllPlaylists)();
    return res.status(200).json(playlists);
}
async function getPLByIdController(req, res) {
    const findPLB = await (0, playListService_1.getPlaylistById)(req.params.id);
    if (!findPLB.success) {
        return res.status(findPLB.code).json({ message: findPLB.message });
    }
    return res.status(findPLB.code).json(findPLB);
}
;
async function postPLController(req, res) {
    const result = await (0, playListService_1.createPlaylist)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function putPLController(req, res) {
    const result = await (0, playListService_1.putPlaylist)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function deletePLController(req, res) {
    const result = await (0, playListService_1.deletePlaylist)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
