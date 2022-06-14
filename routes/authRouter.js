import { Router } from "express";
import signupSchema from "../schemas/signupSchema.js";
//TODO: import signin schema
import { signUp } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/schemaValidator.js";

const authRouter = Router();

authRouter.post("sign-up", validateSchema(signupSchema), signUp);

export default authRouter;