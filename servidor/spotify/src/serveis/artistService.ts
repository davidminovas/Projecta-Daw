import { randomUUID } from "crypto";
import { Artist } from "../interfaces/artist/artist";
import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../interfaces/data/artist/artists.data";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { validatorArtist } from "../validators/artists.validator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { getConnection } from "../config/database";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";


export async function getAllArtists(): Promise<ArtistBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const result: IResult<ArtistBD> = await request.query(`select * from Artist`);
    return result.recordset;
}


export async function getArtistById(idArtist: string): Promise<SelectSuccessService<ArtistBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Artist Where Artist.id = @id`;
    request.input("id", sql.UniqueIdentifier, idArtist);
    const result: IResult<ArtistBD> = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Artist not found"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    }
}

export async function createArtist(artist: Artist): Promise<CreateSuccessService | ErrorService> {

    if (!validatorArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

  
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText = `INSERT INTO Artist(name, pseudonym, country_id)
        VALUES(@realName, @artist, @country)`;


    request.input("artist", sql.NVarChar, artist.artisticName.trim().replace(/\+/g, " "));
    request.input("realName", sql.NVarChar, artist.name.trim().replace(/\+/g, " "));
    request.input("country", sql.UniqueIdentifier, artist.country);


    const result: IResult<ArtistBD> = await request.query(queryText);
    return { success: true, code: 200, data: result.rowsAffected[0] };
}

export async function substitArtist(artist: Artist, idArtist: string): Promise<PutSuccessService | ErrorService> {

    if (!validatorArtist(artist)) {
        return { success: false, code: 400, message: "Invalid data" };
    }


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE Artis 
        SET name = @realName, pseudonym = @artist, country_id = @country
        WHERE id = @id`;


    request.input("id", sql.UniqueIdentifier, idArtist);
    request.input("artist", sql.NVarChar, artist.artisticName.trim().replace(/\+/g, " "));
    request.input("realName", sql.NVarChar, artist.name.trim().replace(/\+/g, " "));
    request.input("country", sql.UniqueIdentifier, artist.country);


    const result: IResult<ArtistBD> = await request.query(queryText);


    return { success: true, code: 200, data: result.rowsAffected[0] } as PutSuccessService;
}

export async function deleteArtist(idArtist: string): Promise<DeletSuccessService | ErrorService> {

     const pool: ConnectionPool = await getConnection();
     const request: sql.Request = pool.request();
 
    const queryText: string = `Delete from Artist Where Artist.id = @id`;
     request.input("id", sql.UniqueIdentifier, idArtist);
 
     const result: IResult<ArtistBD> = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return { success: false, code: 404, message: "Artist not found" };
    }


    return { success: true, code: 200 } as DeletSuccessService;
}