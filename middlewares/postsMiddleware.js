import { getPostById } from "../repositories/postsRepository.js";
import { verifyLikeRepository } from "../repositories/timelineRepositories.js";

export async function handleLikeMiddleware(req, res, next) {
  try {
    const { userId } = res.locals.tokenData;
    const postId = parseInt( req.params.id );
    
    if(!postId || isNaN(postId)) {
      return res.sendStatus(422);
    }

    const [ post ] = await getPostById( postId );
    if(!post) {
      return res.sendStatus(404);
    }
    
    const liked = await verifyLikeRepository(userId, postId);

    res.locals.likesData = { userId, postId, liked };
    next();
    
  } catch (e) {
    console.log("Error in handleLikeMiddleware", e);
    res.sendStatus(500);
  }
}

export async function commentOnPostMiddleware( req, res, next ) {
  try {
    const { commentText } = req.body;
    const postId = parseInt( req.params.postId );

    if( !postId || isNaN( postId )) {
      return res.sendStatus( 422 );
    }

    const [ post ] = await getPostById( postId );
    if( !post ) {
        return res.sendStatus( 404 );
    }

    res.locals.commentData = { commentText, postId };
    next();
    
  } catch ( e ) {
    console.log( e );
    res.sendStatus( 500 );
  }
}