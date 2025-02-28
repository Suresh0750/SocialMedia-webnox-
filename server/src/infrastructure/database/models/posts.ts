
import { Schema, Document, model } from "mongoose";
import { Post } from "@/domain/models/Posts";

export interface PostDocuments extends Post, Document {}


const postSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        trim : true,
        ref : "User"
    },
    content : {
        type : String,
        required : true,
        trim : true
    },
    image : {
        type : String,
        required : true,
        trim : true
    },
    like :  [{ type: Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true,versionKey: false })

 
export default model<PostDocuments>("Post", postSchema,"posts");;