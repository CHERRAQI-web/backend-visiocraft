import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import categorieRoutes from "./routes/categorie.routes.js";
import projectRoutes from "./routes/projet.routes.js";
import fileRoutes from "./routes/projectFile.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import { errorHandler } from "./middleware/error.middleware.js";
import clientRoutes from './routes/client.routes.js';
import freelancerRoutes from "./routes/freelancer.routes.js";
import statsRoutes from './routes/stats.routes.js'

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(express.json({
  type: 'application/json',
}));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin:['http://localhost:5175', 'http://localhost:5173','http://localhost:5174','http://localhost:5176','http://localhost:8080'],
    credentials: true,sameSite: 'none',methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
  })
);

connectDB();


app.use("/api/skills", skillRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/clients", clientRoutes);
app.use('/api/freelancers', freelancerRoutes);
app.use('/api/stats', statsRoutes);

app.use("/api", fileRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

export default app;

// === START RAILWAY DEBUG CODE ===
import fs from 'fs';
import path from 'path';

console.log('--- DEBUGGING RAILWAY FILESYSTEM ---');

// 1. تحقق من الملفات الموجودة في مجلد models وأسماؤها بالضبط
const modelsDir = '/app/models';
try {
  const files = fs.readdirSync(modelsDir);
  console.log('Files in /app/models/:', files);
} catch (err) {
  console.error('Could not read /app/models/ directory:', err);
}

// 2. تحقق من محتوى ملف المتحكم الذي يسبب المشكلة
const controllerPath = '/app/controllers/project.controllers.js';
try {
  const content = fs.readFileSync(controllerPath, 'utf8');
  const lines = content.split('\n');
  console.log('--- First 5 lines of project.controllers.js ---');
  for (let i = 0; i < 5; i++) {
    console.log(`Line ${i + 1}:`, lines[i]);
  }
} catch (err) {
  console.error('Could not read project.controllers.js file:', err);
}

console.log('--- END DEBUGGING ---');
// === END RAILWAY DEBUG CODE ===