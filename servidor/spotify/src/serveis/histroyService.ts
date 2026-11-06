import { Historys } from "../interfaces/data/history/historys";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { isValidHistori } from "../validators/history.validator";
import { History } from "../interfaces/history/history";
import { randomUUID } from "crypto";
import sql, { ConnectionPool, IResult, UniqueIdentifier } from "mssql";
import { getConnection } from "../config/database";

export function getHistoryById(idHistory: string): HistoryBD | undefined {

    return Historys.find(
        (t: HistoryBD) => { return t.id === idHistory }
    );

};

export function createHistory(history: History): CreateSuccessService | ErrorService {

    if (!isValidHistori(history)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const historyRecord: HistoryBD = {
        id: uuid,
        user: history.user.trim().replace(/\s+/g, " "),
        track: history.track.trim().replace(/\s+/g, " "),
        date: new Date,
    };

    Historys.push(historyRecord);

    return { success: true, code: 201, data: 1 }
}




export async function addTrackUserHistory(historyTrack: History): Promise<CreateSuccessService | ErrorService> {

    if (!isValidHistori(historyTrack)) {
        return { success: false, code: 400, message: "Invalid data" };
    }


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Insert INTO History(user_id,track_id)
            VALUES(@user_id,@track_id)
    `;


    request.input("user_id", sql.UniqueIdentifier, historyTrack.user);
    request.input("track_id", sql.UniqueIdentifier, historyTrack.track);


    const result: IResult<number> = await request.query(queryText);

    return { success: true, code: 201, data: result.rowsAffected[0] }
}