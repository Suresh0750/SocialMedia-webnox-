import { Model, MongooseError } from "mongoose"
import Comments,{commentsDocuments} from "../models/comments"
import { ICommentsRepository } from "@/domain/interface/repositories/ICommentRepository"
import { IComments } from "@/domain/entities/IPosts"
import { HttpStatus } from "@/shared/HttpStatusCode"
import { AppError } from "@/presentation/middlewares/ErrorHandler"


export default class CommentsRepository implements ICommentsRepository{
    private CommentModel = Model<commentsDocuments>
    constructor( ){
        this.CommentModel = Comments
    }
    async create(entity: IComments): Promise<IComments> {
        try {
            return await this.CommentModel.create(entity)
            
        } catch (error) {
                        const mongoError = error as MongooseError & { code?: number };
                                if (mongoError?.code === 11000) {
                                    throw new AppError("Email already exists", HttpStatus.Conflict);
                                }
                                throw new AppError("Internal Server Error", HttpStatus.InternalServerError);
        }
    }
    async findByPostId(postId: string): Promise<IComments[] | null> {
        try {
            return await this.CommentModel.find({postId})
        } catch (error) {
            throw error
        }
    }
}