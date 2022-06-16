import { getTimelineRepository, postOnTimelineRepository } from "../repositories/timelineRepositories.js";

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

export async function createPostMiddleware(req, res, next) {
  try {
    next();

  } catch (e) {
    console.log("Error in createPostMiddleware", e);
    res.sendStatus(500);
  }
}