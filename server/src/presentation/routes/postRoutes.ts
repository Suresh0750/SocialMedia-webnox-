import express from "express";

import { postController } from "../DIP/postDIP";
import upload from "@/infrastructure/services/ImageService";

//image

const postRouter = express.Router()


postRouter.post('/create',upload.single("image"),postController.execute.bind(postController))
postRouter.get('/fetch',postController.getPost.bind(postController))
postRouter.post('/postComment',postController.postComment.bind(postController))
postRouter.patch('/toggleLike',postController.toggleLike.bind(postController))


export default postRouter