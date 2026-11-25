"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPlayListTrack = isValidPlayListTrack;
const playLists_1 = require("../interfaces/data/playList/playLists");
const tracks_1 = require("../interfaces/data/track/tracks");
const playListTrackConst_1 = require("../interfaces/playListTrack/playListTrackConst");
function isValidPlayListTrack(playListTracks) {
    if (playListTracks.track === null || playListTracks.playList === null) {
        return false;
    }
    const longTrack = playListTracks.track.trim().replace(/\s+/g, " ").length;
    if (longTrack === 0 || longTrack > playListTrackConst_1.MAXTRACK) {
        return false;
    }
    const playListOk = playLists_1.PlayLists.find((c) => {
        return c.id === playListTracks.playList;
    });
    const TrackOk = tracks_1.tracks.find((c) => {
        return c.id === playListTracks.track;
    });
    if (!playListOk || !TrackOk) {
        return false;
    }
    return true;
}
