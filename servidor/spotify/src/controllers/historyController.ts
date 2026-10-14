import { Historys } from "../interfaces/data/history/historys";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { HistoryBD } from "../interfaces/history/historyBD";
import { createHistory, getHistoryById } from "../serveis/histroyService";
import { Request,Response } from "express"; 

export function getHistoryByIdController(req: Request, res: Response): Response {
    const findHistory: HistoryBD | undefined = getHistoryById(req.params.id as string)

    if (findHistory) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findHistory);
};

export function postHistoryByIdController(req: Request, res: Response): Response {
    const result: CreateSuccessService<HistoryBD> | ErrorService = createHistory(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    Historys.push((result as CreateSuccessService<HistoryBD>).data);
    return res.status(result.code).json(result)

}