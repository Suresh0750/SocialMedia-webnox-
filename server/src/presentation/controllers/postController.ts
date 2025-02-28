import PostUseCase from "@/application/use_cases/post/PostUseCase";
import { HttpStatus } from "@/shared/HttpStatusCode";
import {Request,Response, NextFunction } from "express";



export default class PostController{
    constructor(private postUseCase:PostUseCase){}
    async execute(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const path = req.file?.path
            if(!path) throw new Error('image is required')
            const data = {
                ...req.body,
                image : path
            }
            await this.postUseCase.execute(data)
            res.status(HttpStatus.Success).json({success:true,message:'Post successfully created'})
        } catch (error) {
            next(error)
        }
    }
    async getPost(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            let limit = Number(req.query.limit)
            let page = Number(req.query.page)
            const result = await this.postUseCase.getPost({limit,page})
            res.status(HttpStatus.Success).json({success:false,message:'Post data successfully fetched',result})
        } catch (error) {
            next(error)
        }
    }
    async postComment(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const result = await this.postUseCase.createComment(req.body)
            res.status(HttpStatus.Success).json({success:true,message:'command successfully added'})
        } catch (error) {
            next(error)
        }
    }
    async toggleLike(req:Request,res:Response,next:NextFunction) : Promise<void>{
        try {

            const {postId,userId} =req.body
            await this.postUseCase.like(postId,userId)
            res.status(HttpStatus.Success).json({success:true,message:'toggle is success'})
        } catch (error) {
            next(error) 
        }
    }
}