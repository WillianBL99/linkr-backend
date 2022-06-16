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

// localhost:5000/hashtags