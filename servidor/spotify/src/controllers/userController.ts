import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { UserBD } from "../interfaces/user/userBD";
import { Response, Request } from "express";
import { createUser, deleteUser, getAllUser, getUserById, substitUser } from "../serveis/userService";

import { SelectSuccessService } from "../interfaces/error/selectSucessService";

export async function getAllUserController(_req: Request, res: Response): Promise<Response> {
    const tracks: UserBD[] = await getAllUser();
    return res.status(200).json(tracks);
}

export async function getUserByIdController(req: Request, res: Response): Promise<Response> {
    const findUser: SelectSuccessService<UserBD> | ErrorService = await getUserById(req.params.id as string)

    if (!findUser.success) {
        return res.status(findUser.code).json({ message: (findUser as ErrorService).message })
    }
    return res.status(findUser.code).json(findUser);
};

export async function postUserController(req: Request, res: Response): Promise<Response> {
        const result: CreateSuccessService | ErrorService = await createUser(req.body);
    
        if (!result.success) {
            const errorResult = result as ErrorService;
            return res.status(result.code).json({ message: errorResult.message })
        }
    
        return res.status(result.code).json(result)

}

export async function putUserController(req: Request, res: Response): Promise<Response> {
    const result: PutSuccessService | ErrorService = await substitUser(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }

    return res.status(result.code).json(result)
}

export async function deleteUserController(req: Request, res: Response): Promise<Response> {
    const result: DeletSuccessService | ErrorService = await deleteUser(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }


    return res.status(result.code).send();
}