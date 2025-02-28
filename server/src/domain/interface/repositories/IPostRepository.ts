

import { IPosts } from "../../entities/IPosts";


export interface IPostRepository {
    find(limit:number,skip:number) : Promise<IPosts[]>
    create(entity:IPosts) : Promise<void>
    findById(_id:string) : Promise<IPosts | null>
    toggleLike(postId:string,query:object) : Promise<void>
}
