import db from "./../config/db.js";

export async function getUserByPostId(postId) {
    const user = await db.query(`SELECT "userId" FROM "posts" WHERE id = $1`, [
        postId,
    ]);
    return user.rows[0];
}

export async function getPostById(postId) {
    const { rows: [ post ] } = await db.query(
        `SELECT * FROM "posts" WHERE id = $1`
        , [ postId ]
    );

    return post;
}

export async function postDeleter(postId) {
    console.log("postDeleter", postId);
    await db.query(`UPDATE "posts" SET "statusId" = 3 WHERE id = $1`, [postId]);
}

export async function getPostsByFilter(filter) {
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
        FROM users u
        JOIN posts p ON u.id = p."userId"
        JOIN "postStatus" s ON p."statusId" = s.id
        JOIN links l ON p."linkId" = l.id
        ${filter}
        ORDER BY p."createdAt" DESC
        LIMIT 20
        `
    );
    return posts.rows;
}


export async function postUpdate(postId, newText) {
    await db.query(`
        UPDATE posts
        SET "postBody" = $1
        WHERE id = $2`,
    [newText, postId]
    );
}