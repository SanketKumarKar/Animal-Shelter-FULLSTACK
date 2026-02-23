// vetRoutes.js
// Veterinarian routes 
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

/*
----------------------------------
ADD VETERINARIAN
POST /api/vets
----------------------------------
*/
router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, doc_id, ph, checkup_id } = req.body;
  const result = await pool.query(
    "INSERT INTO vet (name,doc_id,ph,checkup_id) VALUES ($1,$2,$3,$4) RETURNING *",
    [name, doc_id, ph, checkup_id]
  );
  res.json(result.rows[0]);
});
/*
----------------------------------
GET VETERINARIAN
GET /api/vets
----------------------------------
*/

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
   try{
    const result = await pool.query("SELECT * FROM vet ORDER BY doc_id DESC");
    res.json(result.rows);
  }
  catch (err) {
    res.status(500).json({ error: "Failed to fetch vet details" });
  }
});

export default router;
