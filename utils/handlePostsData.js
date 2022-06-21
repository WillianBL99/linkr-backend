import { infoLikes } from "../repositories/timelineRepositories.js";

export default async function handlePostsData(userLoggedId, postsData) {
    const posts = [];
    for (let i = 0; i<postsData.length; i++) {
    
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
        } = postsData[i];

        const metadata = { link, title, image: imageLink };

        posts.push({
            metadata,
            name,
            isOwner: userLoggedId === userId,
            image,
            postId,
            userId,
            postBody,
            postStatus,
            infoLikes: await infoLikes(userLoggedId, postId)
        });
    }

    return posts;
}