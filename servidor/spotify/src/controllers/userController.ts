import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { UserBD } from "../interfaces/user/userBD";
import { Response, Request } from "express";
import { createUser, deleteUser, getUserById, substitUser } from "../serveis/userService";
import { Users } from "../interfaces/data/user/dataUser";

export function getUserByIdController(req: Request, res: Response):Response {
    const findUser: UserBD | undefined = getUserById(req.params.id as string)

    if (findUser) {
        return res.status(404).json({ message: 'Track ${idTrack} not found' })
    }
    return res.status(200).json(findUser);
};

export function postUserByIdController(req: Request, res: Response): Response { 
    const result: CreateSuccessService<UserBD> | ErrorService = createUser(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    Users.push((result as CreateSuccessService<UserBD>).data);
    return res.status(result.code).json(result)

}

export function putUserByIdController(req: Request, res: Response): Response {
    const result: PutSuccessService<UserBD> | ErrorService = substitUser(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService<UserBD>).index;
    Users[index] = (result as PutSuccessService<UserBD>).data;

    return res.status(result.code).json(result)
}

export function deleteUserByIdController(req: Request, res: Response): Response {
    const result: DeletSuccessService | ErrorService = deleteUser(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    Users.splice(index, 1)

    return res.status(result.code).json(result)
}