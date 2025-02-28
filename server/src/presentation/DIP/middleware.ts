

import { AuthenticateTokenUseCase } from "../middlewares/authMiddleware";
import JWTService from "@/infrastructure/services/JWTService";

const jwtService = new JWTService()
const authorizeJwt =  new AuthenticateTokenUseCase(jwtService)



export {authorizeJwt}