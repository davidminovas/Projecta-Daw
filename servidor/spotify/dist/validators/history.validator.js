"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHistori = isValidHistori;
function isValidHistori(histori) {
    if (!histori) {
        return false;
    }
    if (histori.track === null || histori.user === null) {
        return false;
    }
    return true;
}
