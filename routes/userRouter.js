import { Router } from "express";
import userController from "../controllers/userController.js";
import { isAuth, isGuest } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/sign-up", isGuest, userController.userSignUpGet);
userRouter.post("/sign-up", userController.userSignUpPost);

userRouter.get("/log-in", isGuest, userController.userLogInGet);
userRouter.post("/log-in", userController.userLogInPost);

userRouter.get("/log-out", isAuth,userController.userLogOutGet);

export default userRouter;
