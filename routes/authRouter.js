import { Router } from "express";
import signupSchema from "../schemas/signupSchema.js";
import loginSchema from "../schemas/loginSchema.js";
import tokenSchema from "../schemas/tokenSchema.js";
import {
    signUp,
    login,
    validateSession,
} from "../controllers/authController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), signUp);
authRouter.post("/login", validateSchema(loginSchema), login);
authRouter.post("/session", validateSchema(tokenSchema), validateSession);

export default authRouter;
