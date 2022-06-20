import { infoLikes } from "../repositories/timelineRepositories.js";

export default async function handlePostsData(userId, postsData) {
    for (let i = 0; i<postsData.length; i++) {
        const post = postsData[i];
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
        } = post;
        const metadata = { link, title, image: imageLink };

        postsData[i] = {
            metadata,
            name,
            image,
            postId,
            userId,
            postBody,
            postStatus,
            infoLikes: await infoLikes(userId, postId)
        };
    }

    return postsData;
}