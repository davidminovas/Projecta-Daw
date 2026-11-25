"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidTrack = isValidTrack;
const track_constants_1 = require("../interfaces/track/track.constants");
function isValidTrack(track) {
    if (track.title === null || track.artist === null || track.duration === null) {
        return false;
    }
    const longTitol = track.title.trim().replace(/\s+/g, " ").length;
    if (longTitol === 0 || longTitol > track_constants_1.MAXTITOL) {
        return false;
    }
    if (track.duration < 1) {
        return false;
    }
    return true;
}
