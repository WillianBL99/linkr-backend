import { postDeleter } from "../repositories/postsRepository.js";

export async function deletePost(req, res) {
    const {postId} = req.params;
    console.log(postId);
    try{
        await postDeleter(postId);
        res.status(200).send("Post deleted");
    }catch(error){
        console.log("Error in deletePost", error);
        res.sendStatus(500);
    };
};