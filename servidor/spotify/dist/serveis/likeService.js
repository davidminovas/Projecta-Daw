"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putPlaylist = putPlaylist;
const likeValidator_1 = require("../validators/likeValidator");
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
async function putPlaylist(like, id) {
    if (!(0, likeValidator_1.isValidLike)(like)) {
        return { success: false, code: 400, message: "fuck you" };
    }
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `UPDATE Likes SET id=@id,user_id=@user_id, track_id=@track_id, date=@date, likeTrack=@likeTrack)
        WHERE Likes.id=@id `;
    request.input("id", mssql_1.default.UniqueIdentifier, like.id);
    request.input("user_id", mssql_1.default.UniqueIdentifier, like.user);
    request.input("track_id", mssql_1.default.UniqueIdentifier, like.track);
    request.input("date", mssql_1.default.UniqueIdentifier, like.date);
    request.input("likeTrack", mssql_1.default.UniqueIdentifier, like.liketrack);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found."
        };
    }
    return { success: true, data: result.rowsAffected[0], code: 1 };
}
