// volunteerRoutes.js
// Volunteer routes placeholder
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, role, d_id } = req.body;
  const result = await pool.query(
    "INSERT INTO volunteer (name,role,d_id) VALUES ($1,$2,$3) RETURNING *",
    [name, role, d_id]
  );
  res.json(result.rows[0]);
});

export default router;
