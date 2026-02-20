// adopterPhoneRoutes.js
// Adopter phone routes for managing adopter phone numbers
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

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
      // Retrieve all adopter phone numbers along with adopter names by joining the adopter_ph and adopter tables
      const result = await pool.query(
        `SELECT ap.ph, ap.ad_id, a.name AS adopter_name
         FROM adopter_ph ap
         JOIN adopter a ON ap.ad_id = a.ad_id`
      );
      // Return the list of adopter phone numbers in the response
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
  authorizeRole(["admin", "staff"]),
  async (req, res) => {
    try {
      // Extract phone number and adopter ID from request body
      const { ph, ad_id } = req.body;
      // Insert the new phone number for the adopter into the database and return the created record
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
  authorizeRole(["admin", "staff"]),
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
