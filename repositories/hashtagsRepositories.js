import db from "../config/db.js";

export async function getHashtagsRepository() {
    const hashtags = await db.query(`
        SELECT h."name", COUNT(hp."hashtagId") as count
        FROM hashtags h
        JOIN "hashtagsPosts" hp ON h.id = hp."hashtagId"
        GROUP BY h."name" 
        ORDER BY count desc limit 10
    `);
    return hashtags.rows;
};

export async function getHashtagPostsRepository(props){
    const posts = await db.query(`
        SELECT p.id, p."postBody", p."link", u."name", u.image
        FROM posts p
        JOIN users u ON p."userId"=u.id
        JOIN "hashtagsPosts" hp ON p.id=hp."postId"
        JOIN hashtags h ON hp."hashtagId"=h.id
        WHERE h.name = $1
    `,[props]);
    return posts.rows;
};