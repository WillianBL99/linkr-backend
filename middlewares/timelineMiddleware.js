import { getPostsByFilter } from "../repositories/postsRepository.js";
import { createHashtag, getHashtagByName, insertHashtagsPost, insertLink, postOnTimelineRepository } from "../repositories/timelineRepositories.js";
import getMetadataUrl from "../utils/getMetadataUrl.js";

export async function getTimelineMiddleware(req, res, next) {
  const filter = `WHERE p."statusId" <> 3`
  try {
    const timeline = await getPostsByFilter(filter);
    res.locals.timelineQuery = timeline;
    next();

  } catch (e) {
    console.log("Error in getTimelineMiddleware", e);
    res.sendStatus(500);
  }
}

export async function createPostMiddleware(req, res, next) {
  try {
    const { hashtags, link } = req.body;
    const { userId } = res.locals.tokenData;
    
    const linkId = await handlePostsLinks( link );
    const postId = await postOnTimelineRepository( userId, linkId, req.body ); 
    
    if(!hashtags.length) {
      return res.sendStatus(201);
    }
    await handlePostsHashtags(postId, hashtags);

    next();

  } catch (e) {
    console.log("Error in createPostMiddleware", e);
    res.sendStatus(500);
  }
}

async function handlePostsLinks(link) {
  const metadata = await getMetadataUrl(link);
  const linkId = await insertLink(link, metadata);

  return linkId;
}

async function handlePostsHashtags(postId, hashtags) {
  let valuesToHashtagPost = "";
  
  for(let i = 0; i < hashtags.length; i++) {
    let hashtagId = await getHashtagByName(hashtags[i]);
    
    valuesToHashtagPost += `(${postId}, ${hashtagId || await createHashtag(hashtags[i])})`;
    if(i !== hashtags.length - 1) {
      valuesToHashtagPost += ",";
    }
  }
  
  await insertHashtagsPost(valuesToHashtagPost);
}