import { AlbumBD } from "../interfaces/album/albumBD";
import { Albums } from "../interfaces/data/album/albums";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";
import { createAlbum, deleteAlbum, getAlbumById, getAllAlbums, substitAlbum } from "../serveis/albumService";
import { Response, Request } from "express";

export async function getAllAlbumController(_req: Request, res: Response): Promise<Response> {
    const tracks: AlbumBD[] = await getAllAlbums();
    return res.status(200).json(tracks);
}

export async function getAlbumByIdController(req: Request, res: Response): Promise<Response> {
    const findAlbum: SelectSuccessService<AlbumBD> | ErrorService = await getAlbumById(req.params.id as string)

    if (!findAlbum.success) {
        return res.status(findAlbum.code).json({ message: (findAlbum as ErrorService).message })
    }
    return res.status(findAlbum.code).json(findAlbum);
};


export async function postAlbumController(req: Request, res: Response): Promise<Response> {
        const result: CreateSuccessService | ErrorService = await createAlbum(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message })
        }
    
        return res.status(result.code).json(result)

}



export async function putAlbumController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService | ErrorService = await substitAlbum(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result)
}



export async function deleteAlbumController(req: Request, res: Response): Promise<Response> {
    const result: DeletSuccessService | ErrorService = await deleteAlbum(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    return res.status(result.code).send();
}
