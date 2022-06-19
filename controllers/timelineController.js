import { createHashtag, getHashtagByName, handleLikeRepository, infoLikes, insertHashtagsPost, postOnTimelineRepository } from "../repositories/timelineRepositories.js";

export async function getTimeline(req, res) {
  try {
    const { timelineQuery } = res.locals;
    const { tokenData } = res.locals;
    const timeline = [];

    for (let i = 0; i < timelineQuery.length; i++) {
      const { link, title, imageLink } = timelineQuery[i];
      const metadata = {
        link,
        title,
        image: imageLink
      };

      const {
        name,
        image,
        postId,
        userId,
        postBody,
        postStatus
      } = timelineQuery[i];

      timeline.push({
        metadata,
        ...{ name, image, postId, userId, postBody, postStatus },
        infoLikes: await infoLikes( tokenData.userId, timelineQuery[i].postId )
      });
    }  
    console.log(timeline);

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