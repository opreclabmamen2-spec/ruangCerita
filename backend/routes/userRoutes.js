import express from "express";
import {
  predictUser,
  loginUser,
  registerUser,
  getUserAnalyz,
  getProfile,
  getFAQ
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import optionalAuth from "../middlewares/authOptional.js";

const userRouter = express.Router();

// @route   POST /api/user/register
userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser)

userRouter.post("/predict", optionalAuth, predictUser);
userRouter.get("/faq", getFAQ),
userRouter.get("/history", authUser, getUserAnalyz)
userRouter.get("/profile", authUser, getProfile)

export default userRouter;
