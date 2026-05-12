import { Router } from "express";
import userController from "../controllers/userController.js";
import { isGuest } from "../middlewares/auth.js";

const userRouter = Router();

userRouter.get("/sign-up", isGuest, userController.userSignUpGet);
userRouter.post("/sign-up", userController.userSignUpPost);

userRouter.get("/log-in", isGuest, userController.userLogInGet);
userRouter.post("/log-in", userController.userLogInPost);

userRouter.get("/", userController.userIndexGet);
userRouter.get("/log-out", userController.userLogOutGet);

export default userRouter;
