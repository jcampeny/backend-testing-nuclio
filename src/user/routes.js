import express from "express";
import * as userController from "./controllers.js";
import {requestPayloadMiddleware} from "./middlewares.js";
import {registerSchema} from "./schemas.js";

const router = express.Router();

router.post('/register', requestPayloadMiddleware(registerSchema), userController.register);

export default router;
