//Essa rota foi criada para facilitar o DELETE e UPDATE de posts
import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import { validateSchema } from "../middlewares/schemaValidator.js";
import editSchema from "../schemas/editSchema.js";

import {
    deletePost,
    repost,
    handleLike,
    updatePost,
} from "../controllers/postsController.js";
import repostSchema from "../schemas/repostSchema.js";
import { handleLikeMiddleware } from "../middlewares/postsMiddleware.js";

const postsRouter = Router();

postsRouter.use(validateToken);

postsRouter.delete("/posts/:postId", deletePost);
postsRouter.put("/posts/:postId", validateSchema(editSchema), updatePost);
postsRouter.post("/repost", validateSchema(repostSchema), repost);
postsRouter.post("/posts/:id/like", handleLikeMiddleware, handleLike);

export default postsRouter;
