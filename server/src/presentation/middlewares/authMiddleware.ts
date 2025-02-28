import { NextFunction, Request, Response } from 'express';
import { ITokenService } from '@/domain/interface/services/IToken';
import { COOKIES } from '@/shared/constants';
import { Payload } from '@/domain/entities/IUser';
import { HttpStatus } from '@/shared/HttpStatusCode';
import { JwtPayload } from 'jsonwebtoken';
import { NODE_ENV } from '@/config/env';
import { CustomRequest } from '@/domain/entities/utils';





export class AuthenticateTokenUseCase {
    constructor(private tokenService: ITokenService) {
        this.execute = this.execute.bind(this);
    }

    async execute(req: CustomRequest, res: Response, next: NextFunction):Promise<void> {
        let token = req.cookies?.[COOKIES.ACCESS_TOKEN];
        if (token) {
            try {
                const payload = await this.varifyToken(token)
                if (payload) {
                    req.user = payload;
                    return next();
                }
            } catch (error) {
                next((error))
            }
        }
        token = req.cookies?.[COOKIES.REFRESH_TOKEN]
        if (token) {
            try {
                const payload = await this.varifyToken(token) 
                if (payload) {
                    req.user = payload; 
                    const { iat, exp, ...data } = payload as Payload;
                    const newAccessToken = await this.tokenService.generateToken(data, {expiresIn:'10m'});
                    res.cookie(COOKIES.ACCESS_TOKEN, newAccessToken,{
                                    httpOnly: false,
                                    secure : NODE_ENV === 'production',
                                    sameSite: 'strict',
                                    maxAge: 10 * 60 * 1000, 
                                })
                    return next();
                }
            } catch (error) {
                next((error))
            }
        }
        res.status(HttpStatus.Unauthorized).json({ message: "Unauthorized: No valid token found" });
    }
    async varifyToken(token:string){
        try {
            const payload = await this.tokenService.verifyToken(token) as JwtPayload ;
            return payload
        } catch (error:unknown) {
            return null
        }
    }
}

