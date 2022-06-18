import { getUserByPostId } from "./../repositories/postsRepository.js";

export const verifyUser = async (req, res, next) => {
    const { postId } = req.params;

    try {
        const { userId } = res.locals.session;

        const validation = await getUserByPostId(postId);
      
        if (validation.userId !== userId) return res.status(401).send("Not user's post");

        next();
    } catch (error) {
        res.status(500).send(error);
    }
};