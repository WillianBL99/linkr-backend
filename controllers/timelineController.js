import handlePostsData from "../utils/handlePostsData.js";
import { getNumberPostsTimeLine } from "../repositories/postsRepository.js";

export async function getTimeline(req, res) {
    try {
        const {
            timelineQuery,
            tokenData: { userId },
        } = res.locals;

        const timeline = await handlePostsData(userId, timelineQuery);

        res.status(200).send({ posts: timeline });
    } catch (e) {
        console.log("Error in getTimeline", e);
        res.sendStatus(500);
    }
}

export async function postOnTimeline(req, res) {
    res.sendStatus(201);
}

export async function numberPostsTimeLine(req, res) {
    try {
        const {
            tokenData: { userId },
        } = res.locals;
        const numberOfPosts = await getNumberPostsTimeLine(userId);
        res.status(200).send(numberOfPosts[0]);
    } catch (e) {
        console.log("Error getting number of posts timeline", e);
        res.sendStatus(500);
    }
}
