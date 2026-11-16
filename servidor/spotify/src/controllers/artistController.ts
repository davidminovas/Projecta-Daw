import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../interfaces/data/artist/artists.data";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";
import { TrackBD } from "../interfaces/track/trackBD";
import { createArtist, deleteArtist, getAllArtists, getArtistById, substitArtist } from "../serveis/artistService";
import { Response, Request } from "express";


export async function getAllArtistController(_req: Request, res: Response): Promise<Response> {
    const artists: ArtistBD[] = await getAllArtists();
    return res.status(200).json(artists);
}
export async function getArtistByIdController(req: Request, res: Response): Promise<Response> {
    const findTrack: SelectSuccessService<ArtistBD> | ErrorService = await getArtistById(req.params.id as string)

    if (!findTrack.success) {
        return res.status(findTrack.code).json({ message: (findTrack as ErrorService).message })
    }
    return res.status(findTrack.code).json(findTrack);
}

export async function postArtistByIdController(req: Request, res: Response): Promise<Response> {
    const result: CreateSuccessService | ErrorService = await createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result)

}

export async function putArtistByIdController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService | ErrorService = await substitArtist(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result)
}

export async function deleteArtistByIdController(req: Request, res: Response): Promise<Response> {
    const result: DeletSuccessService | ErrorService = await deleteArtist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }

    return res.status(result.code).send();
}