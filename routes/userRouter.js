import {Router} from 'express';
import { validateSchema } from '../middlewares/schemaValidator.js';
import { followUserMiddleware } from '../middlewares/usersMiddleware.js';
import followSchema from '../schemas/followSchema.js';

import { followUser, getUserPosts, getUsers } from './../controllers/userControllers.js';
import { validateToken } from './../middlewares/authMiddleware.js';

const userRouter = Router();

userRouter.use( validateToken );

userRouter.get("/user/:id", getUserPosts);
userRouter.get("/users/:name", getUsers);
userRouter.post(
  "/users/:userId/follow",
  validateSchema( followSchema ), 
  followUserMiddleware, 
  followUser
);

export default userRouter;