import userRepository, { followUserRepository, getConnectionFollow, unfollowUserRepository } from "./../repositories/userRepositories.js";
import { getAllPostByUser, getPostsByFilter, getNumberOfPosts } from "../repositories/postsRepository.js";
import handlePostsData from "../utils/handlePostsData.js";
import SqlString from "sqlstring";


export async function getUserPosts(req, res) {
    const id = parseInt(req.params.id);
    const { posts, limit } = req.query;
    const { userId } = res.locals.tokenData;
    const user = res.locals.user;

    try {
        const connection = await getConnectionFollow(id, userId);
        
        if (posts === "false") {
            const body = {...user[0], following: connection ? true : false, isOwner: userId === id};
            res.status(200).send(body);
            return;
        }

        let userPosts = await getAllPostByUser(id, limit);
        
        userPosts = await handlePostsData( userId, userPosts );
        
        res.status(200).send(userPosts);
        
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getUsers(req, res) {
    const { name } = req.params;
    const {userId} = res.locals.tokenData;

    const filter = name + "%";

    try {
        const users = await userRepository.getUsersByNameOrderedByFollowing(userId, filter);

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

export async function getNumberPostsUser(req, res) {
    const id = parseInt(req.params.id);
    try{
        const filter = `WHERE p."userId" = ${SqlString.escape(id)} AND "statusId" <> 3`;
        const numberOfPosts = await getNumberOfPosts(filter);
        res.status(200).send(numberOfPosts[0]);
    } catch (e) {
        console.log("Error getting number of posts user id", e);
        res.sendStatus(500);    
    }
}
