// adopterPhoneRoutes.js
// Adopter phone routes placeholder
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

/*
----------------------------------
GET ALL ADOPTER PHONES
GET /api/adopter-phones
----------------------------------
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const result = await pool.query(
        `SELECT ap.ph, ap.ad_id, a.name AS adopter_name
         FROM adopter_ph ap
         JOIN adopter a ON ap.ad_id = a.ad_id`
      );

      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/*
----------------------------------
ADD PHONE NUMBER
POST /api/adopter-phones
----------------------------------
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { ph, ad_id } = req.body;

      const result = await pool.query(
        "INSERT INTO adopter_ph (ph, ad_id) VALUES ($1,$2) RETURNING *",
        [ph, ad_id]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

/*
----------------------------------
DELETE PHONE
DELETE /api/adopter-phones/:ph/:ad_id
----------------------------------
*/
router.delete(
  "/:ph/:ad_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { ph, ad_id } = req.params;

      await pool.query(
        "DELETE FROM adopter_ph WHERE ph=$1 AND ad_id=$2",
        [ph, ad_id]
      );

      res.json({ message: "Adopter phone deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

export default router;
