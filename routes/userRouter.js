import {Router} from 'express';

import { getUserPosts, getUsers } from './../controllers/userControllers.js';
import { validateToken } from './../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.get("/user/:id",validateToken, getUserPosts);
userRouter.get("/users/:name", validateToken, getUsers);

export default userRouter;