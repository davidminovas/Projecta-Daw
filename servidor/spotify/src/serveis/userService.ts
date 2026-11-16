import { CreateSuccessService } from "../interfaces/error/createSucessServide";
import { ErrorService } from "../interfaces/error/errorService";
import { User } from "../interfaces/user/user";
import { UserBD } from "../interfaces/user/userBD";
import { isValidUser } from "../validators/userValidator";
import { PutSuccessService } from "../interfaces/error/putSucessServidee";
import { DeletSuccessService } from "../interfaces/error/deletSuccessServes";
import { ConnectionPool, IResult, } from "mssql";
import { getConnection } from "../config/database";
import sql from "mssql"
import { SelectSuccessService } from "../interfaces/error/selectSucessService";



export async function getAllUser(): Promise<UserBD[]> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Select *from User`;
    const result: IResult<UserBD> = await request.query(queryText);
    return result.recordset;

}

export async function getUserById(idUser: string): Promise<SelectSuccessService<UserBD> | ErrorService> {


    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();


    const queryText: string = `Select * from [User] Where User.id = @id`;
    request.input("id", sql.UniqueIdentifier, idUser);



    const result: IResult<UserBD> = await request.query(queryText);


    if (result.recordset.length === 0) {
        return {
            success: false,
            code: 404,
            message: "Playlist not found."
        }
    }


    return {
        success: true,
        code: 200,
        data: result.recordset[0]
    };

}


export async function createUser(user: User): Promise<CreateSuccessService | ErrorService> {


    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "fuck you" };
    }



    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();
    const queryText: string = `INSERT INTO User(id,email,country_id) 
        VALUES(@id,@email,@country_id)`;


    request.input("id", sql.UniqueIdentifier, user.id);
    request.input("email", sql.UniqueIdentifier, user.email);
    request.input("country_id", sql.UniqueIdentifier, user.country);

    const result: IResult<number> = await request.query(queryText);


    return { success: true, data: result.rowsAffected[0], code: 201 };




}

export async function substitUser(user: User, idUser: string): Promise<PutSuccessService | ErrorService> {
    if (!isValidUser(user)) {
        return { success: false, code: 400, message: "Invalid data" };
    }

    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `UPDATE [User] SET 
    id=@id,email=@email,country_id=@country_id
    where track.id=@id
    `;

    request.input("id", sql.UniqueIdentifier, user.id);
    request.input("email", sql.Numeric, user.email);
    request.input("country_id", sql.UniqueIdentifier, user.country);

    const result: IResult<number> = await request.query(queryText);

    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }

    return { success: true, code: 200, data: result.rowsAffected[0] }
}

export async function deleteUser(idUser: string): Promise<DeletSuccessService | ErrorService> {
    const pool: ConnectionPool = await getConnection();
    const request: sql.Request = pool.request();

    const queryText: string = `Delete from User Where User.id = @id`;
    request.input("id", sql.UniqueIdentifier, idUser);

    const result: IResult<UserBD> = await request.query(queryText);
    if (result.rowsAffected[0] === 0) {
        return {
            success: false,
            code: 404,
            message: "Track not found"
        }
    }

    return {
        success: true,
        code: 204,
    } as DeletSuccessService;

}
