import { Router } from "express";
import { getHashtags, getHashtagPosts } from "../controllers/hashtagsController.js";
//#TODO: ## Insert **validateToken** to check authorization
const hashtagsRouter = Router();

hashtagsRouter.get('/hashtags', getHashtags);
hashtagsRouter.get('/hashtag/:hashtag', getHashtagPosts);

export default hashtagsRouter;