"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryByIdController = getHistoryByIdController;
exports.postHistoryController = postHistoryController;
const histroyService_1 = require("../serveis/histroyService");
function getHistoryByIdController(req, res) {
    const findHistory = (0, histroyService_1.getHistoryById)(req.params.id);
    if (findHistory) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' });
    }
    return res.status(200).json(findHistory);
}
;
async function postHistoryController(req, res) {
    const result = await (0, histroyService_1.createHistory)(req.body);
    if (!result.success) {
        const errorResult = result;
        return res.status(result.code).json({ message: errorResult.message });
    }
    return res.status(result.code).json(result);
}
