"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHistoryById = getHistoryById;
exports.createHistory = createHistory;
exports.addTrackUserHistory = addTrackUserHistory;
const historys_1 = require("../interfaces/data/history/historys");
const history_validator_1 = require("../validators/history.validator");
const crypto_1 = require("crypto");
const mssql_1 = __importDefault(require("mssql"));
const database_1 = require("../config/database");
function getHistoryById(idHistory) {
    return historys_1.Historys.find((t) => { return t.id === idHistory; });
}
;
function createHistory(history) {
    if (!(0, history_validator_1.isValidHistori)(history)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid = (0, crypto_1.randomUUID)();
    const historyRecord = {
        id: uuid,
        user: history.user.trim().replace(/\s+/g, " "),
        track: history.track.trim().replace(/\s+/g, " "),
        date: new Date,
    };
    historys_1.Historys.push(historyRecord);
    return { success: true, code: 201, data: 1 };
}
async function addTrackUserHistory(historyTrack) {
    if (!(0, history_validator_1.isValidHistori)(historyTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Insert INTO History(user_id,track_id)
            VALUES(@user_id,@track_id)
    `;
    request.input("user_id", mssql_1.default.UniqueIdentifier, historyTrack.user);
    request.input("track_id", mssql_1.default.UniqueIdentifier, historyTrack.track);
    const result = await request.query(queryText);
    return { success: true, code: 201, data: result.rowsAffected[0] };
}
