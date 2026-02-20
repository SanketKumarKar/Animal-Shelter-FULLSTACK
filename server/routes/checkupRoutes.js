// checkupRoutes.js
// Checkup routes 
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

/*
----------------------------------
ADD CHECKUP
POST /api/checkups
----------------------------------
*/
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { symptoms, details, checkup_date, r_id } = req.body;
  const result = await pool.query(
    "INSERT INTO checkup (symptoms,details,checkup_date,r_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [symptoms, details, checkup_date, r_id]
  );
  res.json(result.rows[0]);
});

export default router;
