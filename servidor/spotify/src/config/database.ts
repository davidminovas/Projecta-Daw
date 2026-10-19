import "dotenv/config";
import  sql  from "mssql";


function getRequierdEnv(name: string): string {
    const value: string | undefined = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable ${name}`);
    }
    return value;
}

const databaseContig: sql.config = {
    user: getRequierdEnv("DB_USER"),
    password: getRequierdEnv("DB_PASSWORD"),
    server: getRequierdEnv("DB_HOST"),
    port: Number(getRequierdEnv("DB_PORT")),
    database: getRequierdEnv("DB_NAME"),
    options: {
        encrypt: getRequierdEnv("DB_ENCRYPT") === "true",
        trustServerCertificate: getRequierdEnv("DB_TRUST_SERVER_CERTIFICATE") === "true",
    }
}

let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool>{
    if (pool) {
        return pool;
    }

    pool = await sql.connect(databaseContig);
    return pool;
}