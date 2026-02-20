// staffPhoneRoutes.js
// Staff phone routes 
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

/*
----------------------------------
GET ALL STAFF PHONES
GET /api/staff-phones
----------------------------------
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT sp.ph, sp.stff_id, s.name AS staff_name
         FROM staff_ph sp
         JOIN staff s ON sp.stff_id = s.stff_id`
      );

      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/*
----------------------------------
ADD STAFF PHONE
POST /api/staff-phones
----------------------------------
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { ph, stff_id } = req.body;

      const result = await pool.query(
        "INSERT INTO staff_ph (ph, stff_id) VALUES ($1,$2) RETURNING *",
        [ph, stff_id]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/*
----------------------------------
DELETE STAFF PHONE
DELETE /api/staff-phones/:ph/:stff_id
----------------------------------
*/
router.delete(
  "/:ph/:stff_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { ph, stff_id } = req.params;

      await pool.query(
        "DELETE FROM staff_ph WHERE ph=$1 AND stff_id=$2",
        [ph, stff_id]
      );

      res.json({ message: "Staff phone deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
