import express from "express";
import cookieParser from "cookie-parser";
import {config} from "dotenv";

import userRoutes from "./src/user/routes.js";

config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use('/api/users', userRoutes);

export default app;
