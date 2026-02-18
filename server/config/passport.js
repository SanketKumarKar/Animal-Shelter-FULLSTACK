// passport.js
// Passport authentication setup placeholder
import passport from "passport";
import pkg from "passport-jwt";
import pool from "./db.js";
import dotenv from "dotenv";

dotenv.config();
const { Strategy, ExtractJwt } = pkg;

passport.use(
  new Strategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET
    },
    async (jwt_payload, done) => {
      const user = await pool.query(
        "SELECT * FROM users WHERE id=$1",
        [jwt_payload.id]
      );

      if (user.rows.length > 0)
        return done(null, user.rows[0]);

      return done(null, false);
    }
  )
);

export default passport;
