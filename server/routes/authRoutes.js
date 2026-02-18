// authRoutes.js
// Authentication routes placeholder
import express from "express";
import passport from "../config/passport.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

export default router;
