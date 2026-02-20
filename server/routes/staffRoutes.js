// staffRoutes.js
// Staff routes 
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

/*
----------------------------------
GET ALL STAFF
GET /api/staff
----------------------------------
*/
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM staff ORDER BY stff_id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
});

/*
----------------------------------
ADD STAFF
POST /api/staff
----------------------------------
*/
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ error: "Name and role are required" });
  try {
    const result = await pool.query(
      "INSERT INTO staff (name, role) VALUES ($1, $2) RETURNING *",
      [name, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add staff" });
  }
});

/*
----------------------------------
UPDATE STAFF
PUT /api/staff/:id
----------------------------------
*/
router.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, role } = req.body;
  try {
    const result = await pool.query(
      "UPDATE staff SET name = $1, role = $2 WHERE stff_id = $3 RETURNING *",
      [name, role, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update staff" });
  }
});

/*
----------------------------------
DELETE STAFF
DELETE /api/staff/:id
----------------------------------
*/
router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    await pool.query("DELETE FROM staff WHERE stff_id = $1", [req.params.id]);
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete staff" });
  }
});

export default router;
