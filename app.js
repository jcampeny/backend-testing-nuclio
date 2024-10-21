import express from "express";
import {config} from "dotenv";

import userRoutes from "./src/user/routes.js";

config();

const app = express();

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);

export default app;
