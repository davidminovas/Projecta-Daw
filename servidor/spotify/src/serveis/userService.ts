import { randomUUID } from "crypto";
import { Users } from "../interfaces/data/user/dataUser";
import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { User } from "../interfaces/user/user";
import { UserBD } from "../interfaces/user/userBD";
import { isValidUser } from "../validators/userValidator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";

export function createUser(user: User): CreateSuccessService<UserBD> | ErrorService {

    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }
    const uuid: string = randomUUID();

    const countryRecord: UserBD = {
        id: uuid,
        email: user.email.trim().replace(/\s+/g, " "),
        country: user.country.trim().replace(/\s+/g, " "), 
    };

    Users.push(countryRecord);

    return { success: true, code: 201, data: countryRecord }
}
export function getUserById(idUsers: string): UserBD | undefined {

    return Users.find(
        (t: UserBD) => { return t.id === idUsers }
    );

};

export function substitUser(user: User, idUser:string): PutSuccessService<UserBD> | ErrorService {
  

    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const index: number = Users.findIndex(
        (t: UserBD) => { return t.id === idUser; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    const updateArtist: UserBD = {
        id: idUser,
        email: user.email.trim().replace(/\s+/g, " "),
        country: user.country.trim().replace(/\s+/g, " "), 
    };

    return { success: true, code: 200, index: index, data: updateArtist };
}

export function deleteUser(idUser: string): DeletSuccessService | ErrorService{
  
    const index: number = Users.findIndex((t: UserBD) => { return t.id === idUser; }
    );
    if (index === -1) {
        return { success: false, code: 404, message: "track not found" }
    }

    return { success: true, code: 204, index: index};
}