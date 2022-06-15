import {Router} from "express";

import authRouter from "./authRouter.js";
import timelineRouter from "./timelineRoute.js";
import userRouter from "./userRouter.js";

const router = Router();
router.use(authRouter);
router.use(timelineRouter);
router.use(userRouter);

export default router;