import { randomUUID } from "crypto";
import { AlbumTrack } from "../interfaces/albumTrack/albumTrack";
import { AlbumTrackBD } from "../interfaces/albumTrack/albumTrackBD";
import { AlbumTracks } from "../interfaces/data/albumTrack/albumsTracks";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { validatorAlbumTrack } from "../validators/albumTrackValidator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { ConnectionPool, IResult } from "mssql";
import sql from "mssql";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";
import { getConnection } from "../config/database";

export async function getAlbumTrackById(idAlbumTrack: string): Promise<SelectSuccessService<AlbumTrackBD> | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select * from Track Where AlbumTracks.id = @id`;
    request.input("id", sql.UniqueIdentifier, idAlbumTrack);
    const result: IResult<AlbumTrackBD> = await request.query(queryText);
    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "AlbumTrack not found"
        }
    }

    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    }

};

export async function createAlbumTrack(albumTrack: AlbumTrack): Promise<CreateSuccessService<number> | ErrorService> {

    if (!validatorAlbumTrack(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Insert INTO AlbumTracks(id,album_id,track_id)
    VALUES(@id,@album_id,@track_id)
    `;
    request.input("id", sql.NVarChar, albumTrack.id);
    request.input("album_id", sql.UniqueIdentifier, albumTrack.album);
    request.input("track_id", sql.Numeric, albumTrack.track);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] }

}



export async function substitAlbumTrack(albumTrack: AlbumTrack, idAlbumTrack: string):Promise< PutSuccessService<number> | ErrorService >{


    if (!validatorAlbumTrack(albumTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `UPDATE AlbumTracks SET 
    id=@id,album_id=@album_id
    where AlbumTrack.id=@id
    `;
    request.input("id", sql.NVarChar, albumTrack.id);
    request.input("album_id", sql.UniqueIdentifier, albumTrack.album);
    request.input("track_id", sql.Numeric, albumTrack.track);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }

    return { success: true, code: 200, data: result.rowsAffected[0] }

}
