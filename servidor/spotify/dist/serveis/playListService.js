"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPlaylists = getAllPlaylists;
exports.getPlaylistById = getPlaylistById;
exports.createPlaylist = createPlaylist;
exports.putPlaylist = putPlaylist;
exports.deletePlaylist = deletePlaylist;
const playList_validator_1 = require("../validators/playList.validator");
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
async function getAllPlaylists() {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select *from Playlist`;
    const result = await request.query(queryText);
    return result.recordset;
}
async function getPlaylistById(idPlayList) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from Playlist Where Playlist.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idPlayList);
    const result = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found."
        };
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}
async function createPlaylist(playlist) {
    if (!(0, playList_validator_1.isValidPlayList)(playlist)) {
        return { success: false, code: 400, message: "fuck you" };
    }
    const title = playlist.tittle.trim().replace(/\s+/g, " ");
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `INSERT INTO Playlist(title,user_id) 
        VALUES(@title,@user_id)`;
    request.input("title", mssql_1.default.NVarChar, title);
    request.input("user_id", mssql_1.default.UniqueIdentifier, playlist.user);
    const result = await request.query(queryText);
    return { success: true, data: result.rowsAffected[0], code: 201 };
}
async function putPlaylist(playlist, id) {
    if (!(0, playList_validator_1.isValidPlayList)(playlist)) {
        return { success: false, code: 400, message: "fuck you" };
    }
    const title = playlist.tittle.trim().replace(/\s+/g, " ");
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `UPDATE PLAYLIST SET title=@title,user_id=@user_id)
        WHERE playlist.id=@id `;
    request.input("title", mssql_1.default.NVarChar, title);
    request.input("user_id", mssql_1.default.UniqueIdentifier, playlist.user);
    request.input("id", mssql_1.default.UniqueIdentifier, id);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found. fuck you"
        };
    }
    return { success: true, data: result.rowsAffected[0], code: 1 };
}
async function deletePlaylist(id) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Delete from Playlist Where Playlist.id = @id;
    request.input("id", sql.UniqueIdentifier, id)`;
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found."
        };
    }
    return {
        success: true,
        code: 204
    };
}
