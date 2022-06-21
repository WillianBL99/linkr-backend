import { getConnectionFollow, getUserById } from "../repositories/userRepositories.js";

export async function followUserMiddleware(req, res, next) {
  const userId = parseInt( req.params.userId );
  const { userId: followerId } = res.locals.tokenData;
  const { follow } = req.body;
  
  if( !userId || isNaN( userId )) {
    return res.sendStatus( 422 );
  }

  if( userId === followerId ) {
    return res.sendStatus( 409 );
  }

  try {
    const [ user ] = await getUserById( userId );
    if( !user ) {
      return res.sendStatus( 404 );
    }

    const connection = await getConnectionFollow( userId, followerId );
    if( ( connection && follow ) || ( !connection && !follow ) ) {
      return res.sendStatus( 409 );
    }
    
    res.locals.followData = { userId, followerId, follow };
    next();
    
  } catch ( e ) {
    console.log( "Error in followUserMiddleware", e );
    res.sendStatus( 500 );
  }
}