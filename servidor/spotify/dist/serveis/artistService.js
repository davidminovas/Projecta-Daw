"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllArtists = getAllArtists;
exports.getArtistById = getArtistById;
exports.createArtist = createArtist;
exports.substitArtist = substitArtist;
exports.deleteArtist = deleteArtist;
const artists_validator_1 = require("../validators/artists.validator");
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../config/database");
async function getAllArtists() {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const result = await request.query(`select * from Artist`);
    return result.recordset;
}
async function getArtistById(idArtist) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from Artist Where Artist.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idArtist);
    const result = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found"
        };
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}
async function createArtist(artist) {
    if (!(0, artists_validator_1.validatorArtist)(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `INSERT INTO Artist(name, pseudonym, country_id)
        VALUES(@realName, @artist, @country)`;
    request.input("artist", mssql_1.default.NVarChar, artist.artisticName.trim().replace(/\+/g, " "));
    request.input("realName", mssql_1.default.NVarChar, artist.name.trim().replace(/\+/g, " "));
    request.input("country", mssql_1.default.UniqueIdentifier, artist.country);
    const result = await request.query(queryText);
    return { success: true, code: 200, data: result.rowsAffected[0] };
}
async function substitArtist(artist, idArtist) {
    if (!(0, artists_validator_1.validatorArtist)(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `UPDATE Artis 
        SET name = @realName, pseudonym = @artist, country_id = @country
        WHERE id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idArtist);
    request.input("artist", mssql_1.default.NVarChar, artist.artisticName.trim().replace(/\+/g, " "));
    request.input("realName", mssql_1.default.NVarChar, artist.name.trim().replace(/\+/g, " "));
    request.input("country", mssql_1.default.UniqueIdentifier, artist.country);
    const result = await request.query(queryText);
    return { success: true, code: 200, data: result.rowsAffected[0] };
}
async function deleteArtist(idArtist) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Delete from Artist Where Artist.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idArtist);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Artist not found" };
    }
    return { success: true, code: 200 };
}
