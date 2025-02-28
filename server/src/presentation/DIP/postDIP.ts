

import PostUseCase from "@/application/use_cases/post/PostUseCase";
import CommentsRepository from "@/infrastructure/database/repositories/CommentsRepository";
import PostRepository from "@/infrastructure/database/repositories/PostRepository";
import PostController from "../controllers/postController";



const commentsRepository = new CommentsRepository()
const postRepository = new PostRepository()

const postUseCase = new PostUseCase(postRepository,commentsRepository)

const postController = new PostController(postUseCase)


export {postController}