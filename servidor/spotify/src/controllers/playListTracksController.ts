import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { PlayListTracksBd } from "../interfaces/playListTrack/playListTrackBD";
import { Response, Request } from "express";
import { createPlayListTrack, deletePlayListTrack, getAllPlayListTracks, getTracksByPlaylistId } from "../serveis/playListTracksService";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { TrackBD } from "../interfaces/track/trackBD";

export async function getPlaylistTracksController(req: Request, res: Response): Promise<Response> {
    const playlistId = req.params.id as string;
    const tracks: TrackBD[] = await getTracksByPlaylistId(playlistId);
    return res.status(200).json(tracks);
}

export async function getAllPlayListTrackController(_req: Request, res: Response): Promise<Response> {
    const playlists: PlayListTracksBd[] = await getAllPlayListTracks();
    return res.status(200).json(playlists);
}

export async function postPlayListTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService | ErrorService = await createPlayListTrack(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    return res.status(result.code).json(result)

}

export async function deletePlayListTrackByIdController(req: Request, res: Response): Promise<Response> {
    const result: DeletSuccessService | ErrorService = await deletePlayListTrack(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
  

    return res.status(result.code).json(result)
}