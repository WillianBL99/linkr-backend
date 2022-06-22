import handlePostsData from "../utils/handlePostsData.js";

export async function getTimeline(req, res) {
  try {
    const { timelineQuery } = res.locals;
    const { tokenData } = res.locals;

    const timeline = await handlePostsData(tokenData.userId, timelineQuery);

    res.status(200).send(timeline);
    
  } catch (e) {
    console.log("Error in getTimeline", e);
    res.sendStatus(500);    
  }
}

export async function postOnTimeline(req, res) {
  res.sendStatus(201);
}