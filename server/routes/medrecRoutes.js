// medrecRoutes.js
// Medical record routes placeholder
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { vacc_det, treatment, anl_id } = req.body;
  const result = await pool.query(
    "INSERT INTO medrec (vacc_det,treatment,anl_id) VALUES ($1,$2,$3) RETURNING *",
    [vacc_det, treatment, anl_id]
  );
  res.json(result.rows[0]);
});

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const result = await pool.query("SELECT * FROM medrec");
  res.json(result.rows);
});

export default router;
