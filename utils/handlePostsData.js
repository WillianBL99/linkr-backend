import { infoRepost } from "../repositories/postsRepository.js";
import { infoLikes } from "../repositories/timelineRepositories.js";

export default async function handlePostsData(userLoggedId, postsData) {
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
            isOwner: userLoggedId === userId,
            image,
            postId,
            userId,
            postBody,
            postStatus,
            infoLikes: await infoLikes(userLoggedId, postId),
            infoRepost: await infoRepost(postId)
        };
    }


    return postsData;
}