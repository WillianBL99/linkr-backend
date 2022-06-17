import { createHashtag, getHashtagByName, insertHashtagsPost, postOnTimelineRepository } from "../repositories/timelineRepositories.js";
import getMetadataUrl from "../utils/getMetadataUrl.js";

export async function getTimeline(req, res) {
  try {
    const { timelineQuery } = res.locals;
    const timeline = [];

    for (let i = 0; i < timelineQuery.length; i++) {
      const link = timelineQuery[i].link;
      delete timelineQuery[i].link;
      const metadata = await getMetadataUrl(link);

      timeline.push({
        ...timelineQuery[i],
        metadata: {...metadata, link}
      });
    }  

    res.status(200).send(timeline);
    
  } catch (e) {
    console.log("Error in getTimeline", e);
    res.sendStatus(500);    
  }
}


export async function postOnTimeline(req, res) {
  try {
    const { hashtags } = req.body;
    const { userId } = res.locals.tokenData;
    
    const postId = await postOnTimelineRepository( userId, req.body );
    let valuesToHashtagPost = "";
    
    if(!hashtags.length) {
      return res.sendStatus(201);
    }
    
    for(let i = 0; i < hashtags.length; i++) {
      let hashtagId = await getHashtagByName(hashtags[i]);
      
      valuesToHashtagPost += `(${postId}, ${hashtagId || await createHashtag(hashtags[i])})`;
      if(i !== hashtags.length - 1) {
        valuesToHashtagPost += ",";
      }
    }

    await insertHashtagsPost(valuesToHashtagPost);

    res.sendStatus(201);

  } catch (e) {
    console.log("Error in postOnTimeline", e);
    res.sendStatus(500);    
  }
}

export async function handleLike(req, res) {
  try {
    const { liked } = req.body;
    const { postId } = req.params;
    const { userId } = res.locals;

    await handleLikeRepository(userId, postId, liked);

    res.sendStatus(200);

  } catch (e) {
    console.log("Error in handleLike", e);
    res.sendStatus(500);    
  }
}