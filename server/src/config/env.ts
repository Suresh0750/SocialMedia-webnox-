import { Secret } from 'jsonwebtoken'
import { AppError } from '@/presentation/middlewares/ErrorHandler'
import { HttpStatus } from '@/shared/HttpStatusCode'
import dotenv from 'dotenv'

dotenv.config()


export const MONGOSH_URL = ()=>{
   if(!process.env.MONGO_URL) throw Error("Mongosh url is not there")
    return String(process.env.MONGO_URL)
}

export const PORT = process.env.PORT || 3002

export const JWT_SECRET_KEY = ():Secret=>{
    if(!process.env.JWT_SECRET){
        throw new AppError('JWT_SECRET Key is missing',HttpStatus.Unauthorized)
    }
    return String(process.env.JWT_SECRET) as Secret
}

export const CLIENT_URL = String(process.env.CLIENT_URL)
export const NODE_ENV = process.env.NODE_ENV!


export const CLOUDINARY_CLOUD_NAME = String(process.env.CLOUDINARY_CLOUD_NAME)
export const CLOUDINARY_API_KEY = String(process.env.CLOUDINARY_API_KEY)
export const CLOUDINARY_API_SECRET = String(process.env.CLOUDINARY_API_SECRET)