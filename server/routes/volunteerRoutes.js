// volunteerRoutes.js
// Volunteer routes 
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

/*
----------------------------------
GET ALL VOLUNTEERS
GET /api/volunteers
----------------------------------
*/
router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM volunteer ORDER BY v_id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch volunteers" });
  }
});

/*
----------------------------------
ADD VOLUNTEER
POST /api/volunteers
----------------------------------
*/
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, role, d_id } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: "Name and role are required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO volunteer (name, role, d_id) VALUES ($1, $2, $3) RETURNING *",
      [name, role, d_id || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to add volunteer" });
  }
});

/*
----------------------------------
UPDATE VOLUNTEER
PUT /api/volunteers/:id
----------------------------------
*/
router.put("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, role, d_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE volunteer SET name = $1, role = $2, d_id = $3 WHERE v_id = $4 RETURNING *",
      [name, role, d_id || null, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update volunteer" });
  }
});

/*
----------------------------------
DELETE VOLUNTEER
DELETE /api/volunteers/:id
----------------------------------
*/
router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  try {
    await pool.query("DELETE FROM volunteer WHERE v_id = $1", [req.params.id]);
    res.json({ message: "Volunteer deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete volunteer" });
  }
});

export default router;
