import { randomUUID } from "crypto";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PlayListTracksBd } from "../interfaces/playListTrack/playListTrackBD";
import { PlayListTrack } from "../interfaces/playListTrack/playListTracks";
import { isValidPlayListTrack } from "../validators/playListTrackValidator";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql"


export async function getAllUser(): Promise<PlayListTracksBd[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select *from User`;
    const result: IResult<PlayListTracksBd> = await request.query(queryText);
    return result.recordset;

}

export async function createPlayListTrack(playListTracks: PlayListTrack): Promise<CreateSuccessService | ErrorService> {


    if (!isValidPlayListTrack(playListTracks)) {
        return { success: false, code: 400, message: "Invalid data" };
    }


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO PlaylistTracks(id,playlist_id,track_id) 
        VALUES(@id,@email,@country_id)`;


    request.input("id", sql.UniqueIdentifier, playListTracks.id);
    request.input("playlist_id", sql.UniqueIdentifier, playListTracks.playList);
    request.input("track_id", sql.UniqueIdentifier, playListTracks.track);

    const result: IResult<number> = await request.query(queryText);

    return { success: true, data: result.rowsAffected[0], code: 201 };

}

export async function deleteTrack(idPlayListTrack: string): Promise<DeletSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from User Where User.id = @id`;
    request.input("id", sql.UniqueIdentifier, idPlayListTrack);

    const result: IResult<PlayListTracksBd> = await request.query(queryText);
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


