import { tracks } from "../interfaces/data/track/tracks";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";
import { TrackBD } from "../interfaces/track/trackBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, substitTrack } from "../serveis/trackService";
import { Response,Request } from "express";


export async function getAllTracksController(_req: Request, res: Response): Promise<Response>{
    const tracks: TrackBD[] = await getAllTracks();
    return res.status(200).json(tracks);
}
export async function getTrackByIdController(req: Request, res: Response):Promise<Response> {
    const findTrack:SelectSuccessService< TrackBD> | ErrorService = await getTrackById(req.params.id as string)

    if (!findTrack.success) {
        return res.status(findTrack.code).json({ message: (findTrack as ErrorService).message })
    }
    return res.status(findTrack.code).json(findTrack);
};

export async function postTrackByIdController(req: Request, res: Response):Promise< Response> { 
        const result: CreateSuccessService<TrackBD> | ErrorService = await createTrack(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message })
        }

        return res.status(result.code).json(result)
}

export async function putTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService<TrackBD> | ErrorService = await substitTrack(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result)
}

export function deleteTrackByIdController(req: Request, res: Response): Response {
    const result: DeletSuccessService | ErrorService = deleteTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    tracks.splice(index, 1)

    return res.status(result.code).json(result)
}