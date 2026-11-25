"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTracksByPlaylistId = getTracksByPlaylistId;
exports.getAllPlayListTracks = getAllPlayListTracks;
exports.createPlayListTrack = createPlayListTrack;
exports.deletePlayListTrack = deletePlayListTrack;
const playListTrackValidator_1 = require("../validators/playListTrackValidator");
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
async function getTracksByPlaylistId(playlistId) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    request.input("playlistId", mssql_1.default.UniqueIdentifier, playlistId);
    const queryText = `
        SELECT t.id, t.title, a.name AS artist, t.duration
        FROM PlaylistTracks pt
        INNER JOIN Track t ON t.id = pt.track_id
        INNER JOIN Artist a ON a.id = t.artist_id
        WHERE pt.playlist_id = @playlistId
    `;
    const result = await request.query(queryText);
    return result.recordset;
}
async function getAllPlayListTracks() {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select *from PlaylistTracks`;
    const result = await request.query(queryText);
    return result.recordset;
}
async function createPlayListTrack(playListTracks) {
    if (!(0, playListTrackValidator_1.isValidPlayListTrack)(playListTracks)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `INSERT INTO PlaylistTracks(id,playlist_id,track_id) 
        VALUES(@id,@email,@country_id)`;
    request.input("id", mssql_1.default.UniqueIdentifier, playListTracks.id);
    request.input("playlist_id", mssql_1.default.UniqueIdentifier, playListTracks.playList);
    request.input("track_id", mssql_1.default.UniqueIdentifier, playListTracks.track);
    const result = await request.query(queryText);
    return { success: true, data: result.rowsAffected[0], code: 201 };
}
async function deletePlayListTrack(idPlayListTrack) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Delete from PlaylistTracks Where PlaylistTracks.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idPlayListTrack);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        };
    }
    return {
        success: true,
        code: 204,
    };
}
