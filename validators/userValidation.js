import { body } from "express-validator";
import userModel from "../models/userModel.js";

const validateUserPost = [
  body("firstName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("First name must be between 1 and 100 characters"),
  body("lastName")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Last name must be between 1 and 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .normalizeEmail({gmail_remove_dots: false})
    .custom(async (value) => {
      const user = await userModel.getUserByEmail(value);
      if (user) throw new Error("Email already exists");
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) throw new Error("Password not match");
    return true;
  }),
];

const validateMessagePost = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 1, max: 255 })
    .withMessage("Title must be between 1 and 255 characters"),
  body("text")
    .trim()
    .notEmpty()
    .withMessage("Text is required"),
];

export { validateUserPost, validateMessagePost };
