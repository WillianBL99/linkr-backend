import { postDeleter, postUpdate } from "../repositories/postsRepository.js";
import { likeRepository, unlinkeRepository } from "../repositories/timelineRepositories.js";
import { getUserByPostId } from "./../repositories/postsRepository.js";

export async function deletePost(req, res) {
    const { postId } = req.params;
    const { userId } = res.locals.tokenData;
    
    try{
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
        const validation = await getUserByPostId(postId);
        if (validation.userId !== userId) return res.status(401).send("Not user's post");

        await postUpdate(postId, newText);

        res.status(200).send("Post updated");
    }catch(error){
        console.log("Error updating post", error);
        res.sendStatus(500);
    };
}

export async function handleLike(req, res) {
    try {
        const {
            userId,
            postId,
            liked,
            likesPost
        } = res.locals.likesData;
  
      if(liked) {
        await unlinkeRepository(userId, postId);
        
      } else {
        await likeRepository(userId, postId);
      }

      res.status(200).send(likesPost);
  
    } catch (e) {
      console.log("Error in handleLike", e);
      res.sendStatus(500);    
    }
  }