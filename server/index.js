// index.js
// Entry point for server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import passport from "./config/passport.js";

import authRoutes from "./routes/authRoutes.js";
import adopterRoutes from "./routes/adopterRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import animalRoutes from "./routes/animalRoutes.js";
import medrecRoutes from "./routes/medrecRoutes.js";
import checkupRoutes from "./routes/checkupRoutes.js";
import vetRoutes from "./routes/vetRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import volunteerRoutes from "./routes/volunteerRoutes.js";
import adopterPhoneRoutes from "./routes/adopterPhoneRoutes.js";
import staffPhoneRoutes from "./routes/staffPhoneRoutes.js";

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: join(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/adopters", adopterRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/animals", animalRoutes);
app.use("/api/medrec", medrecRoutes);
app.use("/api/checkups", checkupRoutes);
app.use("/api/vets", vetRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/volunteers", volunteerRoutes);
app.use("/api/adopter-phones", adopterPhoneRoutes);
app.use("/api/staff-phones", staffPhoneRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});

