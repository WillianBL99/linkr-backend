import { Router } from "express";
import timelineRouter from "./timelineRoute.js";
import hashtagsRouter from "./hashtagsRoute.js";

import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(hashtagsRouter);
router.use(userRouter);

export default router;