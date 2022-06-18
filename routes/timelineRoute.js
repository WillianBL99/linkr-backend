import { Router } from "express";
import { getTimeline, handleLike, postOnTimeline } from "../controllers/timelineController.js";
import { getTimelineMiddleware } from "../middlewares/timelineMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import { createPostSchema, handleLikeSchema } from "../schemas/timelineSchemas.js";
import { validateToken } from "../middlewares/authMiddleware.js";


const timelineRouter = Router();

timelineRouter.use(validateToken);

timelineRouter.get("/timeline",getTimelineMiddleware, getTimeline);
timelineRouter.post("/timeline/post", validateSchema(createPostSchema), postOnTimeline);
timelineRouter.post("/timeline/post/:id/like", validateSchema(handleLikeSchema), handleLike);

export default timelineRouter;