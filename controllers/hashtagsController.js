import { getHashtagsRepository } from "../repositories/hashtagsRepositories.js";
import { getHashtagPostsRepository } from "../repositories/hashtagsRepositories.js";

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
};

export async function getHashtagPosts(req, res) {
    const { hashtag } = req.params;

    try {
        const postRows = await getHashtagPostsRepository(hashtag);

        res.status(200).send(postRows);
    } catch (error) {
        console.log("Error in getHashtagPosts", error);
        res.sendStatus(500);
    }
};