// authController.js
// Authentication controller handling user registration and login
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

// User registration handler
export const register = async (req, res) => {
  // Extract user details from request body
  const { name, email, password, role } = req.body;
  // Hash the password before storing it in the database for security with salt rounds of 10
  const hashed = await bcrypt.hash(password, 10);
  // Insert the new user into the database and return the created user details (excluding password)
  const user = await pool.query(
    `INSERT INTO users (name,email,password,role)
     VALUES ($1,$2,$3,$4)
     RETURNING id,name,email,role`,
    [name, email, hashed, role]
  );
  // Return the created user details in the response
  res.json(user.rows[0]);
};
// User login handler
export const login = async (req, res) => {
  // Extract email and password from request body
  const { email, password } = req.body;
  // Find the user in the database based on the provided email
  const user = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  // If no user is found with the provided email, return an error response
  if (user.rows.length === 0)
    return res.status(400).json({ message: "User not found" });
  // Compare the provided password with the hashed password stored in the database using bcrypt
  const valid = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!valid)
    return res.status(400).json({ message: "Invalid password" });
  // If the password is valid, generate a JWT token containing the user's id and role, signed with the secret key from environment variables, and set to expire in 1 day
  const token = jwt.sign(
    { id: user.rows[0].id, role: user.rows[0].role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  // Return the generated token and user details (excluding password) in the response
  const { password: _, ...userWithoutPassword } = user.rows[0];
  res.json({ token, user: userWithoutPassword });
};
