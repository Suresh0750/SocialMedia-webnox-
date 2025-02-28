
import { Types } from "mongoose"

export interface IPosts {
    _id? : Types.ObjectId | string ;
    userId: Types.ObjectId | string; 
    content: string;
    image: string;
    like: (Types.ObjectId | string)[];  
    __v?:number
}



export interface IComments{
    postId : Types.ObjectId;
    userId: Types.ObjectId;
    comment : string;
}


export interface IPostWithComment extends IPosts {
    comments: IComments[];
} 