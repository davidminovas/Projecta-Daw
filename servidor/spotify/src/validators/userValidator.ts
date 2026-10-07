import { User } from "../interfaces/user/user";
import { MAXEMAIL } from "../interfaces/user/userConst";

export function isValidUser(user: User): boolean {


    if (user.id === null || user.email === null) {
        return false;
    }
    const longEmail: number = user.email.trim().replace(/\s+/g, " ").length;
    if (longEmail === 0 || longEmail > MAXEMAIL) { return false }
    return true;
}