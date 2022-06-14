import {Router} from "express";
import timelineRouter from "./timelineRoute.js";

const router = Router();
router.use(timelineRouter);

export default router;