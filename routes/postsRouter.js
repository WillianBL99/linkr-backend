//Essa rota foi criada para facilitar o DELETE e UPDATE de posts
import { Router } from "express";
import { validateToken } from "../middlewares/authMiddleware.js";
import {verifyUser } from "./../middlewares/verifyUser.js"
import { deletePost } from "../controllers/postsController.js";

const postsRouter = Router();

postsRouter.use(validateToken);

postsRouter.delete('/posts/:postId', verifyUser, deletePost);
// postsRouter.update('/posts/:postId');

export default postsRouter;