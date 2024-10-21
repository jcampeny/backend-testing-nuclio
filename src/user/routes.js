import express from "express";
import * as userController from "./controllers.js";
import {authMiddleware, requestPayloadMiddleware} from "./middlewares.js";
import {loginSchema, registerSchema, uploadImageSchema} from "./schemas.js";

const router = express.Router();

router.post('/register', requestPayloadMiddleware(registerSchema), userController.register);
router.post('/login', requestPayloadMiddleware(loginSchema), userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/me', authMiddleware, userController.getProfile);

export default router;
