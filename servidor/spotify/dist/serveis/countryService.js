"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryById = getCountryById;
exports.createCountry = createCountry;
exports.substitCountry = substitCountry;
const countryValidator_1 = require("../validators/countryValidator");
const database_1 = require("../config/database");
const mssql_1 = __importDefault(require("mssql"));
async function getCountryById(idCountry) {
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Select * from Country Where Country.id = @id`;
    request.input("id", mssql_1.default.UniqueIdentifier, idCountry);
    const result = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Country not found"
        };
    }
    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };
}
;
async function createCountry(country) {
    if (!(0, countryValidator_1.isValidCountry)(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const name = country.name.trim().replace(/\s+/g, " ");
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `Insert INTO COUNTRY(name)
    VALUES(@name)
    `;
    request.input("name", mssql_1.default.NVarChar, name);
    const result = await request.query(queryText);
    return { success: true, code: 201, data: result.rowsAffected[0] };
}
async function substitCountry(country, idCountry) {
    if (!(0, countryValidator_1.isValidCountry)(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const name = country.name.trim().replace(/\s+/g, " ");
    const pool = await (0, database_1.getConnection)();
    const request = pool.request();
    const queryText = `UPDATE COUNTRY SET 
    name=@name
    where country.id=@id
    `;
    request.input("name", mssql_1.default.NVarChar, name);
    const result = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Country not found"
        };
    }
    return { success: true, code: 200, data: result.rowsAffected[0] };
}
