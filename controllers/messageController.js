import { matchedData, validationResult } from "express-validator";
import messageModel from "../models/messageModel.js";
import { validateMessagePost } from "../validators/userValidation.js";

const messageCreateGet = (req, res) => res.render("messages/create", { title: "Create Message", message: req.message });

const messageCreatePost = [validateMessagePost, async (req, res, next) => {
  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("messages/create", {
          title: "Create Message",
          errors: errors.array()
        });
      }

      const { title, text } = matchedData(req);
      const userId  = req.user.id;
      await messageModel.insertMessage(userId, title, text);
      res.redirect("/");
  } catch (err) {
      next(err);        
  }
}];

const messageListGet = async (req, res, next) => {
  try {
    const messages = await messageModel.getAllMessages();
    res.render("index", { "messages": messages, user: req.user });
  } catch (err) {
    next(err)
  }
}

const messageDeletePost = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    await messageModel.deleteMessage(messageId, req.user.id, req.user.is_admin);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
}

export default { messageCreateGet, messageCreatePost, messageListGet, messageDeletePost };