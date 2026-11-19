import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ErrorService } from "../interfaces/error/errorService";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { UserBD } from "../interfaces/user/userBD";
import { Response, Request } from "express";
import { createUser, deleteUser, getUserById, substitUser } from "../serveis/userService";
import { Users } from "../interfaces/data/user/dataUser";
import { SelectSuccessService } from "../interfaces/error/selectSucessService";

export async function getUserByIdController(req: Request, res: Response): Promise<Response> {
    const findUser: SelectSuccessService<UserBD> | ErrorService = await getUserById(req.params.id as string)

    if (!findUser.success) {
        return res.status(findUser.code).json({ message: (findUser as ErrorService).message })
    }
    return res.status(findUser.code).json(findUser);
};

export function postUserController(req: Request, res: Response): Response {
    const result: CreateSuccessService | ErrorService = createUser(req.body);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message })
    }
    Users.push((result as CreateSuccessService).data);
    return res.status(result.code).json(result)

}

export function putUserController(req: Request, res: Response): Response {
    const result: PutSuccessService | ErrorService = substitUser(req.body, req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as PutSuccessService).index;
    Users[index] = (result as PutSuccessService).data;

    return res.status(result.code).json(result)
}

export function deleteUserController(req: Request, res: Response): Response {
    const result: DeletSuccessService | ErrorService = deleteUser(req.params.id as string);

    if (!result.success) {
        const errorResult = result as ErrorService;
        return res.status(result.code).json({ message: errorResult.message });
    }
    const index: number = (result as DeletSuccessService).index;

    Users.splice(index, 1)

    return res.status(result.code).json(result)
}