import express from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import "./config/passport.js"; 
import passport from "passport";
import userRouter from "./routes/userRouter.js";

const app = express();
const PORT = process.env.PORT || 3000;

// views
app.set(
  "views",
  path.join(path.dirname(fileURLToPath(import.meta.url)), "views"),
);
app.set("view engine", "ejs");

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// route
app.use("/", userRouter);

// errors
app.use((err, req, res, next) => {
  console.error(err);

  const message = process.env.NODE_ENV === 'production'
    ? "Sorry, there's a problem on our server"
    : err.message;
  res.status(500).send(message);
});

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
