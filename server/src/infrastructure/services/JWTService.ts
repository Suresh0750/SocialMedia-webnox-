// * Business logic service
import jwt, { JwtPayload, Secret, TokenExpiredError } from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '@/config/env'
import {ITokenService} from '@/domain/interface/services/IToken'
import { AuthenticationError, AuthorizationError } from "@/domain/entities/CustomErrors"


export default class JWTService implements ITokenService{
   
    generateToken(payload: object, expiresTime: object): string {
        return jwt.sign(payload, JWT_SECRET_KEY() ,expiresTime) as string
    }
    verifyToken(token: string): string | JwtPayload | null {
        try {
            return jwt.verify(token, JWT_SECRET_KEY())
        } catch (error:unknown) {
            if (error instanceof TokenExpiredError) {
                throw new AuthenticationError("Token Expired");
            }
            throw new AuthorizationError("Invalid token");
        } 
    }
}   