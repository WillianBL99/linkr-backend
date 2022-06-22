import { getPostById } from "../repositories/postsRepository.js";
import { infoLikes, likeRepository, unlinkeRepository, verifyLikeRepository } from "../repositories/timelineRepositories.js";
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
    const { userId } = res.locals.tokenData;
    const postId = parseInt( req.params.id );
    
    if(!postId || isNaN(postId)) {
      return res.sendStatus(422);
    }

    const post = await getPostById( postId );
    if(!post) {
      return res.sendStatus(404);
    }
    
    const liked = await verifyLikeRepository(userId, postId);

    if(liked) {
      await unlinkeRepository(userId, postId);
      
    } else {
      await likeRepository(userId, postId);
    }

    const likesPost = await infoLikes(userId, postId);
    res.status(200).send(likesPost);

  } catch (e) {
    console.log("Error in handleLike", e);
    res.sendStatus(500);    
  }
}