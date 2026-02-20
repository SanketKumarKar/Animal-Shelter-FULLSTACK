// authRoutes.js
// Authentication routes 
import express from "express";
import passport from "../config/passport.js";
import { register, login } from "../controllers/authController.js";

const router = express.Router();
  
/*
----------------------------------
REGISTER
POST /api/auth/register
----------------------------------
*/
router.post("/register", register);

/*
----------------------------------
LOGIN
POST /api/auth/login
----------------------------------
*/
router.post("/login", login);

/*
----------------------------------
ME
GET /api/auth/me
----------------------------------
*/
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

export default router;
