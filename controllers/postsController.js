import { postDeleter, postUpdate, sendRepost } from "../repositories/postsRepository.js";
import { getUserByPostId } from "./../repositories/postsRepository.js";

export async function deletePost(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals.tokenData;

    try {
        const validation = await getUserByPostId(postId);
        if (validation.userId !== userId)
            return res.status(401).send("Not user's post");

        await postDeleter(postId);

        res.status(200).send("Post deleted");
    } catch (error) {
        res.sendStatus(500);
    }
}

export async function updatePost(req, res) {
    const { postId } = req.params;
    const { newText } = req.body;
    const { userId } = res.locals.tokenData;

    try {
        const validation = await getUserByPostId(postId);
        if (validation.userId !== userId)
            return res.status(401).send("Not user's post");

        await postUpdate(postId, newText);

        res.status(200).send("Post updated");
    } catch (error) {
        console.log("Error updating post", error);
        res.sendStatus(500);
    }
}

export async function repost(req, res) {
    const { userId } = req.locals.tokenData;

    try {
        await sendRepost(userId, postId);
    } catch (error) {
        console.log("Error sending repost", error);
        res.sendStatus(500);
    }
    res.sendStatus(201);
}
