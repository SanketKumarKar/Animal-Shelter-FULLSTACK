// donationRoutes.js
// Donation routes 
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

/*
----------------------------------
GET ALL DONATIONS
GET /api/donations
----------------------------------
*/

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const result = await pool.query("SELECT * FROM donation ORDER BY don_date DESC NULLS LAST");
  res.json(result.rows);
});

/*
----------------------------------
DONATION GROWTH
GET /api/donations/growth
----------------------------------
*/

router.get("/growth", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT TO_CHAR(don_date, 'Mon YYYY') AS month,
              EXTRACT(YEAR FROM don_date) AS year,
              EXTRACT(MONTH FROM don_date) AS month_num,
              SUM(amt) AS amount
       FROM donation
       WHERE don_date IS NOT NULL
       GROUP BY TO_CHAR(don_date, 'Mon YYYY'), EXTRACT(YEAR FROM don_date), EXTRACT(MONTH FROM don_date)
       ORDER BY year, month_num`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch donation growth" });
  }
});

/*
----------------------------------
ADD DONATION
POST /api/donations
----------------------------------
*/

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { amt, items, don_date } = req.body;
  const result = await pool.query(
    "INSERT INTO donation (amt, items, don_date) VALUES ($1, $2, $3) RETURNING *",
    [amt, items, don_date || new Date()]
  );
  res.json(result.rows[0]);
});

export default router;
