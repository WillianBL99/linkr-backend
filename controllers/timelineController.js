import { createHashtag, getHashtagByName, handleLikeRepository, infoLikes, insertHashtagsPost, postOnTimelineRepository } from "../repositories/timelineRepositories.js";
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

export async function handleLike(req, res) {
  try {
    const { liked } = req.body;
    const { userId } = res.locals.tokenData;
    const { id:postId } = req.params;
    
    if(!postId || isNaN(postId)) {
      return res.sendStatus(422);
    }

    const infoLikes = await handleLikeRepository(userId, postId, liked);

    res.status(200).send(infoLikes);

  } catch (e) {
    console.log("Error in handleLike", e);
    res.sendStatus(500);    
  }
}