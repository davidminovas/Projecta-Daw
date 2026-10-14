import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PlayListTracksBd } from "../interfaces/playListTrack/playListTrackBD";
import { Response, Request } from "express";
import { createPlayListTrack, deletePlayListTrack } from "../serveis/playListTracksService";
import { PlayListTracks } from "../interfaces/data/playListTrack/playListTracks";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";



export function postPlayListTrackByIdController(req: Request, res: Response): Response { 
    const result: CreateSuccessService<PlayListTracksBd> | ErrorService = createPlayListTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    PlayListTracks.push((result as CreateSuccessService<PlayListTracksBd>).data);
    return res.status(result.code).json(result)

}


export function deletePlayListTrackByIdController(req: Request, res: Response): Response {
    const result: DeletSuccessService | ErrorService = deletePlayListTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    PlayListTracks.splice(index, 1)

    return res.status(result.code).json(result)
}