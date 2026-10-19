import { AlbumBD } from "../interfaces/album/albumBD";
import { Albums } from "../interfaces/data/album/albums";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";
import { createAlbum, deleteAlbum, getAlbumById, substitAlbum } from "../serveis/albumService";
import { Response, Request } from "express";

export async function getAlbumByIdController(req: Request, res: Response): Promise<Response> {
    const findAlbum: SelectSuccessService<AlbumBD> | ErrorService = await getAlbumById(req.params.id as string)

    if (findAlbum) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findAlbum);
};


export async function postAlbumByIdController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService<AlbumBD> | ErrorService = await createAlbum(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    return res.status(result.code).json(result)

}




export async function putAlbumByIdController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService<AlbumBD> | ErrorService = await substitAlbum(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    return res.status(result.code).json(result)
}



export function deleteAlbumByIdController(req: Request, res: Response): Response {
    const result: DeletSuccessService | ErrorService = deleteAlbum(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    Albums.splice(index, 1)

    return res.status(result.code).json(result)
}