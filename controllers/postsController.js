import { postDeleter, postUpdate, getPostById } from "../repositories/postsRepository.js";
import { getUserByPostId } from "./../repositories/postsRepository.js";

export async function deletePost(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals.tokenData;
    
    try{

        if(!postId || isNaN(postId)) {
            return res.sendStatus(422);
        }
        
        const checkPost = await getPostById(postId);
        if (checkPost.length < 1) return res.status(404).send("Post does not exist");

        const validation = await getUserByPostId(postId);
        if (validation.userId !== userId) return res.status(401).send("Not user's post");

        await postDeleter(postId);

        res.status(200).send("Post deleted");

    }catch(error){
        res.sendStatus(500);
    };
};

export async function updatePost(req, res) {
    const { postId } = req.params;
    const{ newText } = req.body;
    const { userId } = res.locals.tokenData;
    
    try{

        if(!postId || isNaN(postId)) {
            return res.sendStatus(422);
        }

        const checkPost = await getPostById(postId);
        console.log(checkPost)
        if (checkPost.length < 1) return res.status(404).send("Post does not exist");

        const validation = await getUserByPostId(postId);
        if (validation.userId !== userId) return res.status(401).send("Not user's post");

        await postUpdate(postId, newText);

        res.status(200).send("Post updated");
    }catch(error){
        console.log("Error updating post", error);
        res.sendStatus(500);
    };
}