

import { BaseRepository } from "./BaseRepository";
import { IComments } from "../../entities/IPosts";

export interface ICommentsRepository extends Pick<BaseRepository<IComments>,'create'> {
    findByPostId(postId: string) : Promise<IComments[] | null>
}
