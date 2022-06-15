import {Router} from 'express';

import { getUserPosts } from './../controllers/userControllers.js';

const userRouter = Router();

userRouter.get("/user/:id", getUserPosts);

export default userRouter;