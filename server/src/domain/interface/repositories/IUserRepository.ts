
import { BaseRepository } from "./BaseRepository";
import { IUser } from "../../entities/IUser";

export interface IUserRepository extends Pick<BaseRepository<IUser>,'create'> {
    findByEmail(email:string) : Promise<IUser | null>
}
