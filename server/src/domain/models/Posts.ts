import { Schema } from "mongoose";



export interface Post {
    readonly content : string;
    readonly image : string;
    readonly userId : Schema.Types.ObjectId
    readonly like: [{ type: Schema.Types.ObjectId, ref: "User" }];

}

export interface Comment{
    readonly userId : Schema.Types.ObjectId;
    readonly comment : string;
}