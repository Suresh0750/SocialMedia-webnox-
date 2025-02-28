

import { IBcrypt } from "@/domain/interface/services/IBcrypt";
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";
import { AppError } from "@/presentation/middlewares/ErrorHandler";
import { HttpStatus } from "@/shared/HttpStatusCode";
import { ITokenService } from "@/domain/interface/services/IToken";
import { emit } from "process";


export default class LoginUsecase{
    constructor(private userRepository:IUserRepository,private bcrptService : IBcrypt, private jwtService:ITokenService){}
    // * login usecase
    async execute(data:{email:string,password:string}):Promise<object>{
       try {
        
        const isCheckUser = await this.userRepository.findByEmail(data?.email)
        if(!isCheckUser) throw new AppError("Invalid ID or password",HttpStatus.Unauthorized)
        const isPasswordCheck = await this.bcrptService.comparePass(data.password,isCheckUser.password)
        if(!isPasswordCheck) throw new AppError("Invalid ID or password",HttpStatus.Unauthorized)
        const refreshToken = this.jwtService.generateToken({username:isCheckUser.username,email:isCheckUser?.email},{expiresIn:'1h'})
        const accessToken = this.jwtService.generateToken({username:isCheckUser.username,email:isCheckUser?.email},{expiresIn:'10m'})  
        return {refreshToken,accessToken,userData:isCheckUser}
        
       } catch (error) {
        throw error
       }
    }
}


