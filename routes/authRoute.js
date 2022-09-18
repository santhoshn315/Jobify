import express from "express";
const router = express.Router();
import { register, login, updateUser } from "../controllers/authcontroller.js";
import authenticateUser from "../Middleware/auth.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);

router.route("/updateUser").patch(authenticateUser, updateUser);

export default router;
