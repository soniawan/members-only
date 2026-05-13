import { matchedData, validationResult } from "express-validator";
import { validateUserPost } from "../validators/userValidation.js";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import passport from "passport";

const userSignUpGet = (req, res) => res.render("sign-up");

const userSignUpPost = [
  validateUserPost,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("sign-up", {
          title: "Sign up",
          errors: errors.array(),
          formData: req.body
        });
      }

      const { firstName, lastName, email, password } = matchedData(req);
      const hashedPassword = await bcrypt.hash(password, 10);
      await userModel.insertUser(firstName, lastName, email, hashedPassword);
      res.redirect("/log-in");
    } catch (err) {
      next(err);
    }
  },
];

const userLogInGet = (req, res, next) => {
  try {
    const messages = req.session.messages || [];
    req.session.messages = [];
    res.render("log-in", { messages, formData: req.body });
  } catch (err) {
    next(err);
  }
};

const userLogInPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/log-in",
  failureMessage: true,
});

const userLogOutGet = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.redirect("/");
    })
  });
}

export default { userSignUpGet, userSignUpPost, userLogInGet, userLogInPost, userLogOutGet };
