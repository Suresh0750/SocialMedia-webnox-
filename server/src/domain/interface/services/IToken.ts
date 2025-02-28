import { JwtPayload } from "jsonwebtoken";

export interface ITokenService {
    generateToken(payload:object,expiresTime:{expiresIn:string} ): string;
    verifyToken(token: string):  string | JwtPayload | null ;
 }  