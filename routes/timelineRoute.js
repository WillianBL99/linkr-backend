import {Router} from "express";
import { getTimeline } from "../controllers/timelineController.js";
import { getTimelineMiddleware } from "../middlewares/timelineMiddleware.js";

const timelineRouter = Router();

timelineRouter.get("/timeline",getTimelineMiddleware, getTimeline);

export default timelineRouter;