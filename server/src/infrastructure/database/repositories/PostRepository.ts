import { Model, Error as MongooseError } from 'mongoose';
import { IPostRepository } from '@/domain/interface/repositories/IPostRepository';
import Post, { PostDocuments } from '../models/posts';
import { AppError } from '@/presentation/middlewares/ErrorHandler';
import { HttpStatus } from '@/shared/HttpStatusCode';
import { IPosts } from '@/domain/entities/IPosts';


export default class PostRepository implements IPostRepository {
    private PostModel : Model<PostDocuments>
    constructor(){
        this.PostModel = Post
    }

    async create(entity: IPosts): Promise<void> {
        try {
             await this.PostModel.create(entity)
        } catch (error) {
            const mongoError = error as MongooseError & { code?: number };
                    if (mongoError?.code === 11000) {
                        throw new AppError("Email already exists", HttpStatus.Conflict);
                    }
                    throw new AppError("Internal Server Error", HttpStatus.InternalServerError);
        }
       
    }
    async find(limit:number,skip:number): Promise<any> {
        try {
            await new Promise(resolve => setTimeout(resolve, 3000));  // * used handle real world scenario
            return await this.PostModel.find({}).populate('userId').skip(skip).limit(limit).lean()               
        } catch (error) {
            throw error
        }
    }
   async findById(_id: string): Promise<IPosts | null> {
       try {
        return await this.PostModel.findById({_id})
       } catch (error) {
        throw error
       }
   }
   async toggleLike(postId:string,query: object): Promise<void> {
       try {
        await this.PostModel.findByIdAndUpdate({_id:postId},query,{ new: true })
       } catch (error) {
        throw error
       }
   }

}