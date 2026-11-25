"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = getConnection;
require("dotenv/config");
const mssql_1 = __importDefault(require("mssql"));
function getRequierdEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable ${name}`);
    }
    return value;
}
const databaseContig = {
    user: getRequierdEnv("DB_USER"),
    password: getRequierdEnv("DB_PASSWORD"),
    server: getRequierdEnv("DB_HOST"),
    port: Number(getRequierdEnv("DB_PORT")),
    database: getRequierdEnv("DB_NAME"),
    options: {
        encrypt: getRequierdEnv("DB_ENCRYPT") === "true",
        trustServerCertificate: getRequierdEnv("DB_TRUST_SERVER_CERTIFICATE") === "true",
    }
};
let pool = null;
async function getConnection() {
    if (pool) {
        return pool;
    }
    pool = await mssql_1.default.connect(databaseContig);
    return pool;
}
