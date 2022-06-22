import db from "./../config/db.js";

export async function getUserByPostId(postId) {
    const user = await db.query(`SELECT "userId" FROM "posts" WHERE id = $1`, [
        postId,
    ]);
    return user.rows[0];
}

export async function postDeleter(postId) {
    await db.query(`UPDATE "posts" SET "statusId" = 3 WHERE id = $1`, [postId]);
}

export async function getPostsByFilter( filter ) {
    const posts = await db.query(
        `SELECT 
            u.name, 
            u.image, 
            p.id AS "postId", 
            p."userId", 
            COALESCE(p."postBody", '') AS "postBody",
            s.name AS "postStatus",
            l.link,
            l.title,
            l.image AS "imageLink"
        FROM followers f
        JOIN users flwed ON f."followedId" = flwed.id
        JOIN users flw ON f."followerId" = flw.id
        RIGHT JOIN users u ON f."followedId" = u.id
        JOIN  posts p ON u.id = p."userId"
        JOIN "postStatus" s ON p."statusId" = s.id
        JOIN links l ON p."linkId" = l.id
        ${ filter }
        ORDER BY p."createdAt" DESC
        LIMIT 10`
    );
    return posts.rows;
}

export async function getAllPostsFromUsersFollowed( userId ) {
    const FILTER = `
        WHERE s.id != 3
        AND f."followedId" IS NOT NULL
        AND f."followerId" = ${ userId }
    `;

    return await getPostsByFilter( FILTER );
}

export async function getPostById(postId){
    const { rows: post } = await db.query(`SELECT * FROM "posts" WHERE id = $1`, [
        postId,
    ]);
    
    return  post;
}

export async function postUpdate(postId, newText) {
    await db.query(
        `
        UPDATE posts
        SET "postBody" = $1
        WHERE id = $2`,
        [newText, postId]
    );
}

export async function sendRepost(userId, postId) {
    await db.query(
        `INSERT INTO "sharedPosts"
        ("postId", "userId")
        VALUES ($1, $2)`,
        [postId, userId]
    );
}

export async function infoRepost(postId){
    const repostResult = await db.query(
        `SELECT COUNT(*) AS reposts
        FROM "sharedPosts"
        WHERE "postId" = $1`,
        [postId]
    );

    let reposts;

    if(repostResult.rowCount === 0){
        reposts = 0;
    } else{
        reposts = repostResult.rows[0].reposts;
    }
    return reposts;
}