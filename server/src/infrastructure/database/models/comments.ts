
import { Schema, Document, model } from "mongoose";
import { Comment } from "@/domain/models/Posts";
import { IComments } from "@/domain/entities/IPosts";

export interface commentsDocuments extends Comment, Document {}


const commentSchema = new Schema({
    postId : {
        type : Schema.Types.ObjectId,
        required : true,
        trim : true,
        ref : 'Post'
    },
    userId : {
        type : Schema.Types.ObjectId,
        required : true,
        trim : true,
        ref : 'User'
    },
    comment : {
        type : String,
        required : true,
        trim : true
    }
},{timestamps: true,versionKey: false})

const  Comments= model<IComments>("Comments", commentSchema,'comments');
export default Comments;