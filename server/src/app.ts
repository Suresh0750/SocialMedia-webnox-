import express from "express"
import cors from 'cors' 
import cookieParser from 'cookie-parser'
import { CLIENT_URL } from './config/env'; 
import userRouter from "./presentation/routes/userRoutes";
import { errorHandler } from "./presentation/middlewares/ErrorHandler";
import postRouter from "./presentation/routes/postRoutes"; 
import morgan from 'morgan'


const app = express()

// * cors configurations
app.use(cors({
    origin : CLIENT_URL,
    credentials : true,
}))
app.use(morgan("dev"));

app.use(express.json())
app.use(cookieParser())
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)

app.use(errorHandler)
export default app;