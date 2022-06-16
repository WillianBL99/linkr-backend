import {Router} from 'express';

import { getUserPosts, getUsers } from './../controllers/userControllers.js';

const userRouter = Router();

userRouter.get("/user/:id", getUserPosts);
userRouter.get("/users/:name", getUsers);

export default userRouter;