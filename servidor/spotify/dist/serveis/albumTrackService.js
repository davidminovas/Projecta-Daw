"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlbumTrack = createAlbumTrack;
exports.deleteArtistTrack = deleteArtistTrack;
const albumTrackValidator_1 = require("../validators/albumTrackValidator");
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../config/database");
async function createAlbumTrack(albumTrack) {
    if (!(0, albumTrackValidator_1.validatorAlbumTrack)(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Insert INTO AlbumTracks(id,album_id,track_id)
    VALUES(@id,@album_id,@track_id)
    `;
    request.input("id", mssql_1.default.NVarChar, albumTrack.id);
    request.input("album_id", mssql_1.default.UniqueIdentifier, albumTrack.album);
    request.input("track_id", mssql_1.default.Numeric, albumTrack.track);
    const result = await request.query(queryText);
    return { success: true, code: 201, data: result.rowsAffected[0] };
}
async function deleteArtistTrack(idAlbumTrack) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Delete from Track Where AlbumTracks.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idAlbumTrack);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "AlbumTracks not found" };
    }
    return { success: true, code: 200 };
}
