import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { Response, Request } from "express";
import { PlayListBd } from "../interfaces/playList/playListBD";
import { PlayLists } from "../interfaces/data/playList/playLists";
import { createPlaylist, getAllPlaylists, getPlaylistById } from "../serveis/playListService";

export async function getAllPlaylistController(_req: Request, res: Response): Promise<Response> {
    const playlists: PlayListBd[] = await getAllPlaylists();
    return res.status(200).json(playlists);
}

export function getPLByIdController(req: Request, res: Response): Response {
    const findPlayList: PlayListBd | undefined = getPlaylistById(req.params.id as string)

    if (findPlayList) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findPlayList);
};

export function postPLController(req: Request, res: Response): Response {
    const result: CreateSuccessService | ErrorService = createPlaylist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    PlayLists.push((result as CreateSuccessService).data);
    return res.status(result.code).json(result)

}

export function putPLController(req: Request, res: Response): Response {
    const result: PutSuccessService | ErrorService = substitPlaylist(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService).index;
    PlayLists[index] = (result as PutSuccessService).data;

    return res.status(result.code).json(result)
}

export function deletePLController(req: Request, res: Response): Response {
    const result: DeletSuccessService | ErrorService = deletePlayList(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    PlayLists.splice(index, 1)

    return res.status(result.code).json(result)
}


