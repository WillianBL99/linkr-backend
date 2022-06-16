import { Router } from "express";
import { getHashtags } from "../controllers/hashtagsController.js";
//#TODO: ## Insert **validateToken** to check authorization
const hashtagsRouter = Router();

hashtagsRouter.get('/hashtags', getHashtags);

export default hashtagsRouter;