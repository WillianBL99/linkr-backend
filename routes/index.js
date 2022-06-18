import { Router } from "express";
import timelineRouter from "./timelineRoute.js";
import hashtagsRouter from "./hashtagsRoute.js";
import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import postsRouter from "./postsRouter.js";

const router = Router();

router.use(authRouter);
router.use(timelineRouter);
router.use(hashtagsRouter);
router.use(userRouter);
router.use(postsRouter);

export default router;