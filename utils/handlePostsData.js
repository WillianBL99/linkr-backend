import { infoRepost } from "../repositories/postsRepository.js";
import { infoLikes } from "../repositories/timelineRepositories.js";
import { getConnectionFollow } from "../repositories/userRepositories.js";

export default async function handlePostsData(userLoggedId, postsData) {
    const posts = [];
    for (let i = 0; i < postsData.length; i++) {
        const {
            link,
            title,
            imageLink,
            name,
            image,
            postId,
            userId,
            postBody,
            postStatus,
            createdAt,
        } = postsData[i];

        const metadata = { link, title, image: imageLink };
        const connection = await getConnectionFollow(userId, userLoggedId);
        let repostInfo = postsData[i].repostInfo
            ? postsData[i].repostInfo
            : false;

        posts.push({
            metadata,
            name,
            following: connection ? true : false,
            isOwner: userLoggedId === userId,
            image,
            postId,
            userId,
            postBody,
            postStatus,
            infoLikes: await infoLikes(userLoggedId, postId),
            reposts: await infoRepost(postId),
            repostInfo,
            createdAt,
        });
    }

    posts.sort((a, b) => (a.createdAt >= b.createdAt ? -1 : 1));

    return posts;
}
