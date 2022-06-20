import userRepository from "./../repositories/userRepositories.js";
import getMetadataUrl from "../utils/getMetadataUrl.js";
import { getPostsByFilter } from "../repositories/postsRepository.js";

export async function getUserPosts(req, res) {
    const id = parseInt(req.params.id);
    const posts = req.query.posts;
    
    try {
        let user = await userRepository.getUserById(id);

        if (user.length === 0) {
            res.sendStatus(404);
            return;
        }

        if(posts === 'false') {
            res.status(200).send(user[0]);
            return;
        }

        const filter = `WHERE "userId" = ${id} AND "statusId" <> 3`

        // const userPosts = await userRepository.getUserPosts(id);

        const userPosts = await getPostsByFilter(filter);

        for (let post of userPosts) {
            const metadata = await getMetadataUrl(post.link);
            post.metadata = {...metadata, link: post.link};
        }

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
