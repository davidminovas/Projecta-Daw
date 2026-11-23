import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { Response, Request } from "express";
import { PlayListBd } from "../interfaces/playList/playListBD";
import { PlayLists } from "../interfaces/data/playList/playLists";
import { createPlaylist, deletePlaylist, getAllPlaylists, getPlaylistById, putPlaylist } from "../serveis/playListService";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";

export async function getAllPlaylistController(_req: Request, res: Response): Promise<Response> {
    const playlists: PlayListBd[] = await getAllPlaylists();
    return res.status(200).json(playlists);
}

export async function getPLByIdController(req: Request, res: Response): Promise<Response> {
    const findPLB: SelectSuccessService<PlayListBd> | ErrorService = await getPlaylistById(req.params.id as string)

    if (!findPLB.success) {
        return res.status(findPLB.code).json({ message: (findPLB as ErrorService).message })
    }
    return res.status(findPLB.code).json(findPLB);
};

export async function postPLController(req: Request, res: Response): Promise<Response> {
        const result: CreateSuccessService | ErrorService = await createPlaylist(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message })
        }
    
        return res.status(result.code).json(result)

}

export async function putPLController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService | ErrorService = await putPlaylist(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result)
}

export async function deletePLController(req: Request, res: Response): Promise<Response> {
    const result: DeletSuccessService | ErrorService = await deletePlaylist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    return res.status(result.code).send();
}


