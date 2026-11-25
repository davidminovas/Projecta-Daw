"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArtistController = getAllArtistController;
exports.getArtistByIdController = getArtistByIdController;
exports.postArtistController = postArtistController;
exports.putArtistController = putArtistController;
exports.deleteArtistController = deleteArtistController;
const artistService_1 = require("../serveis/artistService");
async function getAllArtistController(_req, res) {
    const artists = await (0, artistService_1.getAllArtists)();
    return res.status(200).json(artists);
}
async function getArtistByIdController(req, res) {
    const findTrack = await (0, artistService_1.getArtistById)(req.params.id);
    if (!findTrack.success) {
        return res.status(findTrack.code).json({ message: findTrack.message });
    }
    return res.status(findTrack.code).json(findTrack);
}
async function postArtistController(req, res) {
    const result = await (0, artistService_1.createArtist)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function putArtistController(req, res) {
    const result = await (0, artistService_1.substitArtist)(req.body, req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
async function deleteArtistController(req, res) {
    const result = await (0, artistService_1.deleteArtist)(req.params.id);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).send();
}
