
import { NotFoundError } from "@/domain/entities/CustomErrors";
import { IComments, IPosts } from "@/domain/entities/IPosts";
import { IPostRepository } from "@/domain/interface/repositories/IPostRepository";
import CommentsRepository from "@/infrastructure/database/repositories/CommentsRepository";

export default class PostUseCase{
    constructor(private postRepository:IPostRepository, private commentsRepository :CommentsRepository){}
    async execute(data:IPosts) : Promise<void>{
        try {
            await this.postRepository.create(data)
        } catch (error) {
            throw error
        }
    }
    async getPost({limit,page}:{limit:number,page:number}) : Promise<IPosts[] | undefined>{
        try {
            let skip = limit*page
            const postData =  await this.postRepository.find(limit,skip)

            // * here fetch all comment along with post datas
            const result = await Promise.all(postData.map(async (data) => {
                const comments = await this.commentsRepository.findByPostId(String(data?._id));
                    return {
                        ...data,
                        comments
                    };
            }));
            return result
        } catch (error) {
            throw error
        }
    }
    async createComment(entity:IComments) : Promise<IComments>{
        try {
            const result = await this.commentsRepository.create(entity)
            return result
        } catch (error) {
            throw error
        }
    }
    async like(postId:string,userId:string) :Promise<void>{
        try {
            const post = await this.postRepository.findById(postId)
            if (!post) {
                throw new NotFoundError('post is not there')
              }
              const isUserPresent = post.like.includes(userId)
              const query = isUserPresent ? { $pull: { like: userId } } : { $addToSet: { like: userId } } ;
            await this.postRepository.toggleLike(postId,query)
        } catch (error) {
            throw error
        }
    }

}