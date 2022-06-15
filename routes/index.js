import {Router} from "express";
import timelineRouter from "./timelineRoute.js";

import userRouter from "./userRouter.js";

const router = Router();
router.use(timelineRouter);

router.use(userRouter);

export default router;