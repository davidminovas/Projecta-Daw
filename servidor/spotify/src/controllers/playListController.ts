import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { UserBD } from "../interfaces/user/userBD";
import { Response, Request } from "express";
import { createUser, deleteUser, getUserById, substitUser } from "../serveis/userService";
import { Users } from "../interfaces/data/user/dataUser";
import { PlayListBd } from "../interfaces/playList/playListBD";
import { createPlayList, deletePlayList, getPlayListById, substitPlayList } from "../serveis/playListService";
import { PlayLists } from "../interfaces/data/playList/playLists";

export function getPLByIdController(req: Request, res: Response):Response {
    const findPlayList: PlayListBd | undefined = getPlayListById(req.params.id as string)

    if (findPlayList) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findPlayList);
};

export function postPLByIdController(req: Request, res: Response): Response { 
    const result: CreateSuccessService<PlayListBd> | ErrorService = createPlayList(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    PlayLists.push((result as CreateSuccessService<PlayListBd>).data);
    return res.status(result.code).json(result)

}

export function putPLByIdController(req: Request, res: Response): Response {
    const result: PutSuccessService<PlayListBd> | ErrorService = substitPlayList(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService<PlayListBd>).index;
    PlayLists[index] = (result as PutSuccessService<PlayListBd>).data;

    return res.status(result.code).json(result)
}

export function deletePLByIdController(req: Request, res: Response): Response {
    const result: DeletSuccessService | ErrorService = deletePlayList(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    PlayLists.splice(index, 1)

    return res.status(result.code).json(result)
}