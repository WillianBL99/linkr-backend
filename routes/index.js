import {Router} from "express";
import timelineRouter from "./timelineRoute.js";

import authRouter from "./authRouter.js";

const router = Router();
router.use(authRouter);
router.use(timelineRouter);

export default router;