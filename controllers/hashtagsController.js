import { getHashtagsRepository } from "../repositories/hashtagsRepositories.js";
import { getHashtagPostsRepository } from "../repositories/hashtagsRepositories.js";
import {infoLikes} from "../repositories/timelineRepositories.js";
import getMetadataUrl from "../utils/getMetadataUrl.js";

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
    const { userId } = res.locals.tokenData;
    const posts = [];
    try {
        const postRows = await getHashtagPostsRepository(hashtag);

        for(let i = 0; i < postRows.length; i++){
            const link = postRows[i].link;
            delete postRows[i].link;
            const metadata = await getMetadataUrl(link);

            posts.push({
                ...postRows[i],
                metadata: {...metadata, link},
                infoLikes: await infoLikes( userId, postRows[i].postId )
            });
        };

        res.status(200).send(posts);
    } catch (error) {
        console.log("Error in getHashtagPosts", error);
        res.sendStatus(500);
    }
};