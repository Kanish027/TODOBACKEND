import express from "express";
import {
  home,
  login,
  logout,
  register,
  userProfile,
} from "../controllers/userControllers.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);
router.get("/", isAuthenticated, home);
router.get("/profile", isAuthenticated, userProfile);
router.get("/logout", isAuthenticated, logout);

export default router;
