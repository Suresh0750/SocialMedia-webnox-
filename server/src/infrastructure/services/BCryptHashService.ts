

import bcrypt from "bcrypt"
import { IBcrypt } from '@/domain/interface/services/IBcrypt'

export class BCryptService implements IBcrypt {
    private readonly saltRounds = 10
    
    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password,this.saltRounds)
    }
    async comparePass(password: string, hashPassword: string): Promise<boolean> {
        return await bcrypt.compare(password,hashPassword)
    }
}