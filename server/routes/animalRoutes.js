// animalRoutes.js
// Animal routes placeholder
import express from "express";
import passport from "../config/passport.js";
import pool from "../config/db.js";

const router = express.Router();

router.get("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const animals = await pool.query(
    `SELECT a.*, ad.name AS adopter_name, s.name AS staff_name
     FROM animal a
     LEFT JOIN adopter ad ON a.ad_id = ad.ad_id
     LEFT JOIN staff s ON a.stff_id = s.stff_id`
  );
  res.json(animals.rows);
});

router.post("/", passport.authenticate("jwt", { session: false }), async (req, res) => {
  const { name, age, breed, adm_date, ad_id, stff_id } = req.body;

  const animal = await pool.query(
    `INSERT INTO animal (name,age,breed,adm_date,ad_id,stff_id)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [name, age, breed, adm_date, ad_id, stff_id]
  );

  res.json(animal.rows[0]);
});

export default router;
