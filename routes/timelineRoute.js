import { Router } from "express";
import { getTimeline, postOnTimeline } from "../controllers/timelineController.js";
import { getTimelineMiddleware } from "../middlewares/timelineMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { createPostSchema } from "../schemas/timelineSchemas.js";


const timelineRouter = Router();

timelineRouter.get("/timeline",getTimelineMiddleware, getTimeline);
timelineRouter.post("/timeline/post", validateSchema(createPostSchema), postOnTimeline);

export default timelineRouter;