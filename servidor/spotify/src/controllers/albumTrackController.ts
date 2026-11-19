import { AlbumTracks } from "../interfaces/data/albumTrack/albumsTracks";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { createAlbumTrack, deleteArtistTrack } from "../serveis/albumTrackService";
import { Response, Request } from "express";



export function postAlbumTrackController(req: Request, res: Response): Response {
    const result: CreateSuccessService | ErrorService = createAlbumTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    AlbumTracks.push((result as CreateSuccessService).data);
    return res.status(result.code).json(result)

}

export async function deleteAlbumTrackController(req: Request, res: Response): Promise<Response> {
    const result: DeletSuccessService | ErrorService = await deleteArtistTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
  

    return res.status(result.code).json(result)
}