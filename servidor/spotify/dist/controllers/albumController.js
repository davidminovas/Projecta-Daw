"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAlbumController = getAllAlbumController;
exports.getAlbumByIdController = getAlbumByIdController;
exports.postAlbumController = postAlbumController;
exports.putAlbumController = putAlbumController;
exports.deleteAlbumController = deleteAlbumController;
const albumService_1 = require("../serveis/albumService");
async function getAllAlbumController(_req, res) {
    const tracks = await (0, albumService_1.getAllAlbums)();
    return res.status(200).json(tracks);
}
async function getAlbumByIdController(req, res) {
    const findAlbum = await (0, albumService_1.getAlbumById)(req.params.id);
    if (!findAlbum.success) {
        return res.status(findAlbum.code).json({ message: findAlbum.message });
    }
    return res.status(findAlbum.code).json(findAlbum);
}
;
async function postAlbumController(req, res) {
    const result = await (0, albumService_1.createAlbum)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function putAlbumController(req, res) {
    const result = await (0, albumService_1.substitAlbum)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function deleteAlbumController(req, res) {
    const result = await (0, albumService_1.deleteAlbum)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
