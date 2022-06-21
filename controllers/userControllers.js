import SqlString from "sqlstring";

import userRepository, { followUserRepository, unfollowUserRepository } from "./../repositories/userRepositories.js";
import { getPostsByFilter } from "../repositories/postsRepository.js";
import { infoLikes } from "../repositories/timelineRepositories.js";
import handlePostsData from "../utils/handlePostsData.js";

export async function getUserPosts(req, res) {
    const id = parseInt(req.params.id);
    const posts = req.query.posts;
    const {tokenData} = res.locals

    try {
        let user = await userRepository.getUserById(id);

        if (user.length === 0) {
            res.sendStatus(404);
            return;
        }

        if (posts === "false") {
            res.status(200).send(user[0]);
            return;
        }

        const filter = `WHERE "userId" = ${SqlString.escape(id)} AND "statusId" <> 3`;

        let userPosts = await getPostsByFilter(filter);

        userPosts = await handlePostsData(tokenData.userId, userPosts);
        
        res.status(200).send(userPosts);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getUsers(req, res) {
    const { name } = req.params;

    const filter = name + "%";

    try {
        const users = await userRepository.getUsersByName(filter);
        if (users.length === 0) {
            res.sendStatus(404);
            return;
        }
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function followUser( req, res ) {
    const { userId, followerId, follow } = res.locals.followData;

    try {
        if( follow ) {
            await followUserRepository( userId, followerId );
            res.status(201).send({ follow: true });
        } else {
            await unfollowUserRepository( userId, followerId );
            res.status(204).send({ follow: false });
        }

    } catch (e) {
        console.log('Error in followUser', e);
        res.sendStatus(500);
    }
}
