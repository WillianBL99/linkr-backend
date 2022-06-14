import db from "../config/db.js";
import { getTimelineRepository } from "../repositories/timelineRepositories.js";

export async function getTimeline(req, res) {
  try {
    const timeline = await getTimelineRepository();
    res.status(200).send(timeline);
    
  } catch (e) {
    console.log("Error in getTimeline", e);
    res.sendStatus(500);    
  }
}