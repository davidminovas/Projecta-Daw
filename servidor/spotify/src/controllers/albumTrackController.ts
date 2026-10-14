import { AlbumTrackBD } from "../interfaces/albumTrack/albumTrackBD";
import { AlbumTracks } from "../interfaces/data/albumTrack/albumsTracks";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { createAlbumTrack, getAlbumTrackById, substitAlbumTrack } from "../serveis/albumTrackService";
import { Response, Request } from "express";

export function getAlbumTrackByIdController(req: Request, res: Response): Response {
    const findAlbumTrack: AlbumTrackBD | undefined = getAlbumTrackById(req.params.id as string)

    if (findAlbumTrack) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findAlbumTrack);
};

export function postAlbumTrackByIdController(req: Request, res: Response): Response {
    const result: CreateSuccessService<AlbumTrackBD> | ErrorService = createAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    AlbumTracks.push((result as CreateSuccessService<AlbumTrackBD>).data);
    return res.status(result.code).json(result)

}

export function putAlbumTrackByIdController(req: Request, res: Response): Response {
    const result: PutSuccessService<AlbumTrackBD> | ErrorService = substitAlbumTrack(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService<AlbumTrackBD>).index;
    AlbumTracks[index] = (result as PutSuccessService<AlbumTrackBD>).data;

    return res.status(result.code).json(result)
}