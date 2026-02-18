// authController.js
// Authentication controller placeholder
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await pool.query(
    `INSERT INTO users (name,email,password,role)
     VALUES ($1,$2,$3,$4)
     RETURNING id,name,email,role`,
    [name, email, hashed, role]
  );

  res.json(user.rows[0]);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (user.rows.length === 0)
    return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!valid)
    return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.rows[0].id, role: user.rows[0].role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
};
