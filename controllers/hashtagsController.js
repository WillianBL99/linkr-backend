import SqlString from "sqlstring";

import { getHashtagsRepository } from "../repositories/hashtagsRepositories.js";
import {
    getPostsByFilter,
    getNumberOfPosts,
} from "../repositories/postsRepository.js";
import handlePostsData from "../utils/handlePostsData.js";

export async function getHashtags(req, res) {
    try {
        const hashtagsRows = await getHashtagsRepository();

        const hashtags = hashtagsRows.map((obj) => {
            return obj.name;
        });

        res.status(200).send(hashtags);
    } catch (error) {
        console.log("Error in getHashtags", error);
        res.sendStatus(500);
    }
}

export async function getHashtagPosts(req, res) {
    const { hashtag } = req.params;
    const { userId } = res.locals.tokenData;
    const { limit } = req.query;

    if (!hashtag || !limit) {
        res.sendStatus(422);
        return;
    }

    const filter = `
    JOIN "hashtagsPosts" hp ON p.id=hp."postId"
    JOIN hashtags h ON hp."hashtagId"=h.id
    WHERE h.name = ${SqlString.escape(hashtag)} AND "statusId" <> 3`;

    const from = `FROM users u`;
    try {
        const postRows = await getPostsByFilter(from, filter, limit);
        const posts = await handlePostsData(userId, postRows);

        res.status(200).send(posts);
    } catch (error) {
        console.log("Error in getHashtagPosts", error);
        res.sendStatus(500);
    }
}

export async function numberPostsHashtag(req, res) {
    const { hashtag } = req.params;

    if (!hashtag) {
        res.sendStatus(422);
        return;
    }

    try {
        const filter = `
        JOIN "hashtagsPosts" hp ON p.id=hp."postId"
        JOIN hashtags h ON hp."hashtagId"=h.id
        WHERE h.name = ${SqlString.escape(hashtag)} AND "statusId" <> 3`;
        const numberOfPosts = await getNumberOfPosts(filter);
        res.status(200).send(numberOfPosts[0]);
    } catch (e) {
        console.log("Error getting number of posts hashtags", e);
        res.sendStatus(500);
    }
}
