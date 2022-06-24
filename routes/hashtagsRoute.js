import { Router } from "express";
import { getHashtags, getHashtagPosts, numberPostsHashtag } from "../controllers/hashtagsController.js";
import { validateToken } from "../middlewares/authMiddleware.js";
const hashtagsRouter = Router();

hashtagsRouter.get('/hashtags', getHashtags);
hashtagsRouter.get('/hashtag/:hashtag', validateToken, getHashtagPosts);
hashtagsRouter.get('/hashtag/:hashtag/number', validateToken, numberPostsHashtag);

export default hashtagsRouter;