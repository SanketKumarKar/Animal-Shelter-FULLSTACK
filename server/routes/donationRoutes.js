// donationRoutes.js
// Donation routes placeholder
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const result = await pool.query("SELECT * FROM donation");
  res.json(result.rows);
});

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { amt, items } = req.body;
  const result = await pool.query(
    "INSERT INTO donation (amt,items) VALUES ($1,$2) RETURNING *",
    [amt, items]
  );
  res.json(result.rows[0]);
});

export default router;
