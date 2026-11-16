import { ConnectionPool, IResult } from "mssql";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { LikeBD } from "../interfaces/like/likeDb";
import { isValidLike } from "../validators/likeValidator";
import { getConnection } from "../config/database";
import sql from "mssql"

export async function putPlaylist(like: LikeBD, id: string | string[]): Promise<PutSuccessService<Response> | ErrorService> {
    if (!isValidLike(like)) {
        return { success: false, code: 400, message: "fuck you" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `UPDATE Likes SET id=@id,user_id=@user_id, track_id=@track_id, date=@date, likeTrack=@likeTrack)
        WHERE Likes.id=@id `;

    request.input("id", sql.UniqueIdentifier, like.id);
    request.input("user_id", sql.UniqueIdentifier, like.user);
    request.input("track_id", sql.UniqueIdentifier, like.track);
    request.input("date", sql.UniqueIdentifier, like.date);
    request.input("likeTrack", sql.UniqueIdentifier, like.liketrack);

    const result: IResult<number> = await request.query(queryText);


    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found."
        }
    }
    return { success: true, data: result.rowsAffected[0], code: 1 };
}