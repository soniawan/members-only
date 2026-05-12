import { Router } from "express";
import messageController from "../controllers/messageController.js";
import { isAuth } from "../middlewares/auth.js";

const messageRouter = Router();

messageRouter.get("/messages", isAuth, messageController.messageCreateGet)

export default messageRouter;