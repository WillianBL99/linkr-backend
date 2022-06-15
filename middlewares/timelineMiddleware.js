import { getTimelineRepository } from "../repositories/timelineRepositories.js";

export async function getTimelineMiddleware(req, res, next) {
  try {
    const timeline = await getTimelineRepository();
    res.locals.timelineQuery = timeline;
    next();

  } catch (e) {
    console.log("Error in getTimelineMiddleware", e);
    res.sendStatus(500);
  }
}