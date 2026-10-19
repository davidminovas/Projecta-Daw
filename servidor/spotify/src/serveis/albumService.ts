import { randomUUID } from "crypto";
import { Album } from "../interfaces/album/album";
import { AlbumBD } from "../interfaces/album/albumBD";
import { Artist } from "../interfaces/artist/artist";
import { Albums } from "../interfaces/data/album/albums";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { validatorAlbum } from "../validators/albumValidator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql";

export async function getAlbumById(idAlbum: string): Promise<SelectSuccessService<AlbumBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `Select * from ALBUM Where Album.id = @id`;
    request.input("id", sql.UniqueIdentifier, idAlbum);
    const result: IResult<AlbumBD> = await request.query(queryText);
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



export async function createAlbum(album: Album): Promise<CreateSuccessService<number> | ErrorService> {

    if (!validatorAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const title: string = album.title.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Insert INTO ALBUM(title,artist_id,data)
    VALUES(@title,@artist_id,@data)
    `;
    request.input("title", sql.NVarChar, title);
    request.input("artist_id", sql.UniqueIdentifier, album.artist);
    request.input("data", sql.Numeric, new Date());

    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] }

}



export async function substitAlbum(album: Album, idAlbum: string): Promise<PutSuccessService<number> | ErrorService>{


    if (!validatorAlbum(album)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const title: string = album.title.trim().replace(/\s+/g, " ");

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `UPDATE ALBUM SET 
    title(@title,artist_id=@artist_id,duration=@duration
    where track.id=@id
    `;
    request.input("title", sql.NVarChar, title);
    request.input("artist_id", sql.UniqueIdentifier, album.artist);
    request.input("data", sql.Numeric, new Date);
    request.input("id", sql.UniqueIdentifier, idAlbum);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Album not found"
        }
    }

    return { success: true, code: 200, data: result.rowsAffected[0] }

}








export async function deleteAlbum(idAlbum: string): Promise<DeletSuccessService | ErrorService> {

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from ALBUM Where Album.id = @id`;
    request.input("id", sql.UniqueIdentifier, idAlbum);

    const result: IResult<AlbumBD> = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }

    return {
        success: true,
        code: 204,
    }
}
