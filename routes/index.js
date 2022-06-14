import { Router } from "express";
import timelineRouter from "./timelineRoute.js";
import hashtagsRouter from "./hashtagsRoute.js";

const router = Router();

router.use(timelineRouter);
router.use(hashtagsRouter);

export default router;