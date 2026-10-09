import { ArtistBD } from "../interfaces/artist/artistBD";
import { artists } from "../interfaces/data/artist/artists.data";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { createArtist, deleteArtist, getArtistById, substitArtist } from "../serveis/artistService";
import { Response, Request } from "express";

export function getArtistByIdController(req: Request, res: Response): Response {
    const findArtist: ArtistBD | undefined = getArtistById(req.params.id as string)

    if (findArtist) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findArtist);
};

export function postArtistByIdController(req: Request, res: Response): Response {
    const result: CreateSuccessService<ArtistBD> | ErrorService = createArtist(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    artists.push((result as CreateSuccessService<ArtistBD>).data);
    return res.status(result.code).json(result)

}

export function putArtistByIdController(req: Request, res: Response): Response {
    const result: PutSuccessService<ArtistBD> | ErrorService = substitArtist(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService<ArtistBD>).index;
    artists[index] = (result as PutSuccessService<ArtistBD>).data;

    return res.status(result.code).json(result)
}

export function deleteArtistByIdController(req: Request, res: Response): Response {
    const result: DeletSuccessService | ErrorService = deleteArtist(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    artists.splice(index, 1)

    return res.status(result.code).json(result)
}