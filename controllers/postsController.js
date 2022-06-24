import {
    postDeleter,
    postUpdate,
    getPostById,
    sendRepost,
    commentOnPostRepository,
} from "../repositories/postsRepository.js";
import {
    infoLikes,
    likeRepository,
    postOnTimelineRepository,
    unlinkeRepository,
} from "../repositories/timelineRepositories.js";

export async function deletePost(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals.tokenData;

    try {
        if (!postId || isNaN(postId)) {
            return res.sendStatus(422);
        }

        const checkPost = await getPostById(postId);
        if (checkPost.length < 1)
            return res.status(404).send("Post does not exist");

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
        if (!postId || isNaN(postId)) {
            return res.sendStatus(422);
        }

        const checkPost = await getPostById(postId);
        console.log(checkPost);
        if (checkPost.length < 1)
            return res.status(404).send("Post does not exist");

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
    const { userId } = res.locals.tokenData;
    const {postId} = req.body;

    try {
        await sendRepost(userId, postId);
        res.sendStatus(201);
    } catch (error) {
        console.log("Error sending repost", error);
        res.sendStatus(500);
        return;
    }
}

export async function handleLike(req, res) {
    try {
        const { userId, postId, liked } = res.locals.likesData;

        if (liked) {
            await unlinkeRepository(userId, postId);
        } else {
            await likeRepository(userId, postId);
        }

        const likesPost = await infoLikes(userId, postId);

        res.status(200).send(likesPost);
    } catch (e) {
        console.log("Error in handleLike", e);
        res.sendStatus(500);
    }
}

export async function commentOnPost( req, res ) {
    try {
        const { userId } = res.locals.tokenData;
        const { commentText } = req.body;
        const postId = parseInt( req.params.postId );

        const [ post ] = await getPostById( postId );
        if( !post ) {
            return res.sendStatus( 404 );
        }

        const comments = await commentOnPostRepository( postId, userId, commentText );

        res.status( 200 ).send( comments );

    } catch ( e ) {
        console.log( e );
        res.sendStatus( 500 );
    }
}