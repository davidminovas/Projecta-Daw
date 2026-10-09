import { tracks } from "../interfaces/data/track/tracks";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { TrackBD } from "../interfaces/track/trackBD";
import { createTrack, deleteTrack, getAllTracks, getTrackById, substitTrack } from "../serveis/trackService";
import { Response,Request } from "express";


export function getAllTracksController(_req:Request,res: Response):Response{
    return res.status(200).json(getAllTracks());
}
export function getTrackByIdController(req: Request, res: Response):Response {
    const findTrack: TrackBD | undefined = getTrackById(req.params.id as string)

    if (findTrack) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findTrack);
};

export function postTrackByIdController(req: Request, res: Response): Response { 
        const result: CreateSuccessService<TrackBD> | ErrorService = createTrack(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message })
        }
        tracks.push((result as CreateSuccessService<TrackBD>).data);
        return res.status(result.code).json(result)
}

export function putTrackByIdController(req: Request, res: Response): Response {
    const result: PutSuccessService<TrackBD> | ErrorService = substitTrack(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService<TrackBD>).index;
    tracks[index] = (result as PutSuccessService<TrackBD>).data;

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