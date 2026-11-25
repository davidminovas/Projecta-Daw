"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllAlbums = getAllAlbums;
exports.getAlbumById = getAlbumById;
exports.createAlbum = createAlbum;
exports.substitAlbum = substitAlbum;
exports.deleteAlbum = deleteAlbum;
const albumValidator_1 = require("../validators/albumValidator");
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
async function getAllAlbums() {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from Album`;
    const result = await request.query(queryText);
    return result.recordset;
}
async function getAlbumById(idAlbum) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from Album Where Album.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idAlbum);
    const result = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Album not found"
        };
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}
;
async function createAlbum(album) {
    if (!(0, albumValidator_1.validatorAlbum)(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const title = album.title.trim().replace(/\s+/g, " ");
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Insert INTO Album(title,artist_id,date)
    VALUES(@title,@artist_id,@date)
    `;
    request.input("title", mssql_1.default.NVarChar, title);
    request.input("artist_id", mssql_1.default.UniqueIdentifier, album.artist);
    request.input("date", mssql_1.default.Numeric, album.data);
    const result = await request.query(queryText);
    return { success: true, code: 201, data: result.rowsAffected[0] };
}
async function substitAlbum(album, idAlbum) {
    if (!(0, albumValidator_1.validatorAlbum)(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const title = album.title.trim().replace(/\s+/g, " ");
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `UPDATE ALBUM SET 
    title(@title,artist_id=@artist_id,duration=@duration
    where track.id=@id
    `;
    request.input("title", mssql_1.default.NVarChar, title);
    request.input("artist_id", mssql_1.default.UniqueIdentifier, album.artist);
    request.input("data", mssql_1.default.Numeric, new Date);
    request.input("id", mssql_1.default.UniqueIdentifier, idAlbum);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Album not found"
        };
    }
    return { success: true, code: 200, data: result.rowsAffected[0] };
}
async function deleteAlbum(idAlbum) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Delete from ALBUM Where Album.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idAlbum);
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
