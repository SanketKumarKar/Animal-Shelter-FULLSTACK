// staffRoutes.js
// Staff routes placeholder
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const result = await pool.query("SELECT * FROM staff");
  res.json(result.rows);
});

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, role } = req.body;
  const result = await pool.query(
    "INSERT INTO staff (name,role) VALUES ($1,$2) RETURNING *",
    [name, role]
  );
  res.json(result.rows[0]);
});

export default router;
