import express from "express";
import { userController } from "../DIP/usersDIP";
import { authorizeJwt } from "../DIP/middleware";

const userRouter = express.Router();

userRouter.post("/signup", userController.signup.bind(userController));
userRouter.post("/login",userController.login.bind(userController))
userRouter.post("/logout",authorizeJwt.execute,userController.logout.bind(userController))

export default userRouter;
