import { Router } from "express";
import signupSchema from "../schemas/signupSchema.js";
import loginSchema from "../schemas/loginSchema.js"
import { signUp, login } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post("/sign-up", validateSchema(signupSchema), signUp);
authRouter.post("/login", validateSchema(loginSchema), login);

export default authRouter;