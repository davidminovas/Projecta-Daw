"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUser = getAllUser;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.substitUser = substitUser;
exports.deleteUser = deleteUser;
const userValidator_1 = require("../validators/userValidator");
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
async function getAllUser() {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select *from [User]`;
    const result = await request.query(queryText);
    return result.recordset;
}
async function getUserById(idUser) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from [User] Where User.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idUser);
    const result = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found."
        };
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}
async function createUser(user) {
    if (!(0, userValidator_1.isValidUser)(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `INSERT INTO User(id,email,country_id) 
        VALUES(@id,@email,@country_id)`;
    request.input("id", mssql_1.default.UniqueIdentifier, user.id);
    request.input("email", mssql_1.default.UniqueIdentifier, user.email);
    request.input("country_id", mssql_1.default.UniqueIdentifier, user.country);
    const result = await request.query(queryText);
    return { success: true, data: result.rowsAffected[0], code: 201 };
}
async function substitUser(user, idUser) {
    if (!(0, userValidator_1.isValidUser)(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `UPDATE [User] SET 
    id=@id,email=@email,country_id=@country_id
    where track.id=@id
    `;
    request.input("id", mssql_1.default.UniqueIdentifier, user.id);
    request.input("email", mssql_1.default.Numeric, user.email);
    request.input("country_id", mssql_1.default.UniqueIdentifier, user.country);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        };
    }
    return { success: true, code: 200, data: result.rowsAffected[0] };
}
async function deleteUser(idUser) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Delete from User Where User.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idUser);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "User not found"
        };
    }
    return {
        success: true,
        code: 204,
    };
}
