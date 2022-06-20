//Essa rota foi criada para facilitar o DELETE e UPDATE de posts
import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";

import { deletePost, updatePost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.use(validateToken);

postsRouter.delete('/posts/:postId', deletePost);
postsRouter.put('/posts/:postId', updatePost);

export default postsRouter;