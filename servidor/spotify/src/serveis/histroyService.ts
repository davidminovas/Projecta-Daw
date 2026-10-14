import { Historys } from "../interfaces/data/history/historys";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { isValidHistori } from "../validators/history.validator";
import { History } from "../interfaces/history/history";

export function getHistoryById(idHistory: string): HistoryBD | undefined {

    return Historys.find(
        (t: HistoryBD) => { return t.id === idHistory }
    );

};

export function createHistory(history: History): CreateSuccessService<HistoryBD> | ErrorService {

    if (!isValidHistori(history)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const artisRecord: ArtistBD = {
        id: uuid,
        artisticName: artist.artisticName.trim().replace(/\s+/g, " "),
        name: artist.name.trim().replace(/\s+/g, " "),
        country: artist.country,
    };

    artists.push(artisRecord);

    return { success: true, code: 201, data: artisRecord }
}

