// adopterRoutes.js
// Adopter routes placeholder
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const result = await pool.query("SELECT * FROM adopter");
  res.json(result.rows);
});

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, address } = req.body;
  const result = await pool.query(
    "INSERT INTO adopter (name,address) VALUES ($1,$2) RETURNING *",
    [name, address]
  );
  res.json(result.rows[0]);
});

router.delete("/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
  await pool.query("DELETE FROM adopter WHERE ad_id=$1", [req.params.id]);
  res.json({ message: "Deleted" });
});

export default router;
