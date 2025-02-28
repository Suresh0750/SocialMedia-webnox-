// import { SignupDTO } from "@/application/dtos/userDTO";
import { IUser } from "@/domain/entities/IUser"; 
import { IUserRepository } from "@/domain/interface/repositories/IUserRepository";
import { IBcrypt } from "@/domain/interface/services/IBcrypt";


export default class SignupUseCase {
    constructor(private userRepository: IUserRepository,private bcrptService:IBcrypt) {}
    // * sign up usecase
    async execute(data:IUser): Promise<IUser> {
        const hashPassword = await this.bcrptService.hashPassword(data?.password)
        return await this.userRepository.create({...data,password:hashPassword});;
    }
    
}
