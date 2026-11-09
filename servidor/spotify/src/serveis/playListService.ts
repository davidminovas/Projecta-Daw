import { randomUUID } from "crypto";
import { PlayLists } from "../interfaces/data/playList/playLists";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PlayList } from "../interfaces/playList/playList";
import { PlayListBd } from "../interfaces/playList/playListBD";
import { isValidPlayList } from "../validators/playList.validator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ConnectionPool, IResult } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql"
import { SelectSuccessService } from "../interfaces/error/selectSucessService";
export async function getAllPlaylists(): Promise<PlayListBd[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select *from Playlist`;
    const result: IResult<PlayListBd> = await request.query(queryText);
    return result.recordset;

}


export async function getPlaylistById(id: string
): Promise<SelectSuccessService<PlayListBd> | ErrorService> {


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();


    const queryText: string = `Select * from Playlist Where Playlist.id = @id;
    request.input("id", sql.UniqueIdentifier, id)`;


    const result: IResult<PlayListBd> = await request.query(queryText);


    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found."
        }
    }


    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };






}


export async function createPlaylist(playlist: PlayList): Promise<CreateSuccessService | ErrorService> {


    if (!isValidPlayList(playlist)) {
        return { success: false, code: 400, message: "fuck you" };
    }


    const title: string = playlist.tittle.trim().replace(/\s+/g, " ");


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO Playlist(title,user_id) 
        VALUES(@title,@user_id)`;


    request.input("title", sql.NVarChar, title);
    request.input("user_id", sql.UniqueIdentifier, playlist.user);


    const result: IResult<number> = await request.query(queryText);


    return { success: true, data: result.rowsAffected[0], code: 201 };




}


export async function putPlaylist(playlist: PlayListBd, id: string | string[]): Promise<PutSuccessService<Response> | ErrorService> {
    if (!isValidPlayList(playlist)) {
        return { success: false, code: 400, message: "fuck you" };
    }


    const title: string = playlist.tittle.trim().replace(/\s+/g, " ");


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE PLAYLIST SET title=@title,user_id=@user_id)
        WHERE playlist.id=@id `;


    request.input("title", sql.NVarChar, title);
    request.input("user_id", sql.UniqueIdentifier, playlist.user);
    request.input("id", sql.UniqueIdentifier, id);


    const result: IResult<number> = await request.query(queryText);


    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found. fuck you"
        }
    }
    return { success: true, data: result.rowsAffected[0], code: 200 };
}


export async function deletePlaylist(id: string | string[]): Promise<DeletSuccessService | ErrorService> {


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();


    const queryText: string = `Delete from Playlist Where Playlist.id = @id;
    request.input("id", sql.UniqueIdentifier, id)`;


    const result: IResult<PlayListBd> = await request.query(queryText);


    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found."
        }
    }


    return {
        success: true,
        code: 204
    };
}




























