import { Request,Response,NextFunction } from "express";
import SignupUseCase from "@/application/use_cases/user/SignupUseCase";
import LoginUsecase from "@/application/use_cases/user/LoginUseCase";
import { IUser, LoginUsecaseResponse } from "@/domain/entities/IUser";
import { HttpStatus } from "@/shared/HttpStatusCode";
import { COOKIES } from "@/shared/constants";
import { NODE_ENV } from "@/config/env";
import { CustomRequest } from "@/domain/entities/utils";
import { LogoutUserUseCase } from "@/application/use_cases/user/LogoutUseCase";



export default class UserController{
    constructor(private signupUseCase: SignupUseCase,private loginUseCases:LoginUsecase,private logoutUserUseCase:LogoutUserUseCase){}
    async signup(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const result = await this.signupUseCase.execute(req.body)

            res.status(HttpStatus.Created).json({success:true,result,message:'Successfully account is created'})
        } catch (error) {
            next(error)
        }
    }
    async login(req:Request,res:Response,next:NextFunction):Promise<void>{
        try {
            const result = await this.loginUseCases.execute(req.body) as LoginUsecaseResponse

            // * set the token in cookie
            res.cookie(COOKIES.ACCESS_TOKEN, result.accessToken,{
                httpOnly: false,
                secure : NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 10 * 60 * 1000, 
            })
            res.cookie(COOKIES.REFRESH_TOKEN, result.refreshToken,{
                httpOnly: true,
                secure : NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 1000, 
            })
            res.status(HttpStatus.Success).json({success:true,userData:result.userData,message:"successfully login"})
        } catch (error:unknown) {
            next(error)
        }
    }
    async logout(req:CustomRequest,res:Response,next:NextFunction):Promise<void>{
        try {
            await this.logoutUserUseCase.execute(res)
            res.status(HttpStatus.Success).json({success:true, message: 'Logged out successfully' });
          } catch (error) {
           next(error)
          }
    }
}   