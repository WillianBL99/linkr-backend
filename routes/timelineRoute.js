import { Router } from "express";
import { getTimeline,  postOnTimeline, numberPostsTimeLine } from "../controllers/timelineController.js";
import { createPostMiddleware, getTimelineMiddleware } from "../middlewares/timelineMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { createPostSchema } from "../schemas/timelineSchemas.js";
import { validateToken } from "../middlewares/authMiddleware.js";


const timelineRouter = Router();

timelineRouter.use(validateToken);

timelineRouter.get("/timeline",getTimelineMiddleware, getTimeline);
timelineRouter.post("/timeline/post", validateSchema(createPostSchema), createPostMiddleware, postOnTimeline);
timelineRouter.get("/timeline/number", numberPostsTimeLine);

export default timelineRouter;