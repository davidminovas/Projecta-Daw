import { randomUUID } from "crypto";
import { Country } from "../interfaces/country/country";
import { CountryBD } from "../interfaces/country/countryBD";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { isValidCountry } from "../validators/countryValidator";
import { Countrys } from "../interfaces/data/country/dataCountrys";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";

export async function getCountryById(idCountry: string): Promise<SelectSuccessService<CountryBD> | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Track Where Country.id = @id`;
    request.input("id", sql.UniqueIdentifier, idCountry);
    const result: IResult<CountryBD> = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    }

};

export async function createCountry(country: Country): Promise<CreateSuccessService<number> | ErrorService> {

    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    
    const name: string = country.name.trim().replace(/\s+/g, " ");
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Insert INTO COUNTRY(name)
    VALUES(@name)
    `;
    request.input("name", sql.NVarChar, name);
 
    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] }
}

export function substitCountry(country: Country, idCountry:string): PutSuccessService<CountryBD> | ErrorService {
  

    if (!isValidCountry(country)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = Countrys.findIndex(
        (t: CountryBD) => { return t.id === idCountry; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    const updateArtist: CountryBD = {
        id: idCountry,
        name: country.name.trim().replace(/\s+/g, " "),
    };

    return { success: true, code: 200, index: index, data: updateArtist };
}