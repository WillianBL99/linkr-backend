import { postDeleter } from "../repositories/postsRepository.js";
import { getUserByPostId } from "./../repositories/postsRepository.js";

export async function deletePost(req, res) {
    const {postId} = req.params;
    const { userId } = res.locals.tokenData;
    
    try{
        const validation = await getUserByPostId(postId);
        if (validation.userId !== userId) return res.status(401).send("Not user's post");

        await postDeleter(postId);

        res.status(200).send("Post deleted");
    }catch(error){
        console.log("Error in deletePost", error);
        res.sendStatus(500);
    };
};