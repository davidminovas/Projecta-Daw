"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTracks = getAllTracks;
exports.getTrackById = getTrackById;
exports.createTrack = createTrack;
exports.substitTrack = substitTrack;
exports.deleteTrack = deleteTrack;
const track_validator_1 = require("../validators/track.validator");
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
async function getAllTracks() {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select t.*, a.name as artist from Track t inner join artist a on t.artist_id=a.id`;
    const result = await request.query(queryText);
    return result.recordset;
}
async function getTrackById(idTrack) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from Track Where Track.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idTrack);
    const result = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        };
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}
async function createTrack(track) {
    if (!(0, track_validator_1.isValidTrack)(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const title = track.title.trim().replace(/\s+/g, " ");
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Insert INTO TRACK(title,artist_id,duration)
    VALUES(@title,@artist_id,@duration)
    `;
    request.input("title", mssql_1.default.NVarChar, title);
    request.input("artist_id", mssql_1.default.UniqueIdentifier, track.artist);
    request.input("duration", mssql_1.default.Numeric, track.duration);
    const result = await request.query(queryText);
    return { success: true, code: 201, data: result.rowsAffected[0] };
}
async function substitTrack(track, idTrack) {
    if (!(0, track_validator_1.isValidTrack)(track)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const title = track.title.trim().replace(/\s+/g, " ");
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `UPDATE TRACK SET 
    title=@title,artist_id=@artist_id,duration=@duration
    where track.id=@id
    `;
    request.input("title", mssql_1.default.NVarChar, title);
    request.input("artist_id", mssql_1.default.UniqueIdentifier, track.artist);
    request.input("duration", mssql_1.default.Numeric, track.duration);
    request.input("id", mssql_1.default.UniqueIdentifier, idTrack);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        };
    }
    return { success: true, code: 200, data: result.rowsAffected[0] };
}
async function deleteTrack(idTrack) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Delete from Track Where Track.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idTrack);
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
