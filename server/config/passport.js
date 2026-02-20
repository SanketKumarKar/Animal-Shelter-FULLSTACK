// passport.js
// Passport authentication setup using JWT strategy
import passport from "passport";
import pkg from "passport-jwt";
import pool from "./db.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });
const { Strategy, ExtractJwt } = pkg;

passport.use(
  new Strategy(
    // JWT strategy options
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload, done) => {
      // Find the user in the database based on the JWT payload
      const user = await pool.query(
        "SELECT * FROM users WHERE id=$1",
        [jwt_payload.id]
      );
      // If user is found, return the user object, otherwise return false
      if (user.rows.length > 0)
        return done(null, user.rows[0]);

      return done(null, false);
    }
  )
);

export default passport;
