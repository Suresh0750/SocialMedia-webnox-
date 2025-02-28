


import {connect} from 'mongoose'
import {MONGOSH_URL} from '../../config/env'
import { AppError } from '@/presentation/middlewares/ErrorHandler';
import { HttpStatus } from '@/shared/HttpStatusCode';


const connectDB = async()=>{
    try {
        await connect(MONGOSH_URL())
        console.log(`database connected successfully`)
    } catch (error:unknown) {
        throw new AppError("Unknown error occurred during DB connection",HttpStatus.InternalServerError)
    }
}

export {connectDB}

