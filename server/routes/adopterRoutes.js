import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";
import { authorizeRole } from "../middleware/roleMiddleware.js";

const router = express.Router();
/*
----------------------------------
GET ALL ADOPTERS
GET /api/adopters
----------------------------------
*/
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM adopter ORDER BY ad_id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch adopters" });
  }
});

/*
----------------------------------
ADD ADOPTER
POST /api/adopters
----------------------------------
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  //only admin and staff can add adopters
  authorizeRole(["admin", "staff"]),
  async (req, res) => {
    const { name, address } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    try {
      const result = await pool.query(
        "INSERT INTO adopter (name, address) VALUES ($1, $2) RETURNING *",
        [name, address]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to add adopter" });
    }
  }
);

/*
----------------------------------
UPDATE ADOPTER
PUT /api/adopters/:id
----------------------------------
*/
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  //only admin and staff can update adopters
  authorizeRole(["admin", "staff"]),
  async (req, res) => {
    const { name, address } = req.body;
    try {
      const result = await pool.query(
        "UPDATE adopter SET name = $1, address = $2 WHERE ad_id = $3 RETURNING *",
        [name, address, req.params.id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: "Failed to update adopter" });
    }
  }
);

/*
----------------------------------
DELETE ADOPTER
DELETE /api/adopters/:id
----------------------------------
*/

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  authorizeRole(["admin", "staff"]),
  async (req, res) => {
    try {
      await pool.query("DELETE FROM adopter WHERE ad_id = $1", [req.params.id]);
      res.json({ message: "Adopter deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete adopter" });
    }
  }
);

export default router;
