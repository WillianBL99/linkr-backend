import sqlstring from "sqlstring";
import SqlString from "sqlstring";
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

export async function getPostsByFilter(from, filter, limit) {
    const limiter = limit;

    const posts = await db.query(
        `SELECT 
            u.name, 
            u.image, 
            p.id AS "postId", 
            p."userId", 
            p."createdAt",
            COALESCE(p."postBody", '') AS "postBody",
            s.name AS "postStatus",
            l.link,
            l.title,
            l.image AS "imageLink"
        ${from}
        JOIN  posts p ON u.id = p."userId"
        JOIN "postStatus" s ON p."statusId" = s.id
        JOIN links l ON p."linkId" = l.id
        ${filter}
        ORDER BY p."createdAt" DESC
        LIMIT ${limiter}`
    );

    return posts.rows;
}

export async function getNumberOfPosts(filter) {
    const posts = await db.query(
        `SELECT COUNT (*)  
        FROM followers f
        JOIN users flwed ON f."followedId" = flwed.id
        JOIN users flw ON f."followerId" = flw.id
        RIGHT JOIN users u ON f."followedId" = u.id
        JOIN  posts p ON u.id = p."userId"
        JOIN "postStatus" s ON p."statusId" = s.id
        JOIN links l ON p."linkId" = l.id
        ${filter}
        `
    );
    return posts.rows;
}
export async function getRepostsByFilter(from, filter, limit) {
    const repostsResult = await db.query(
        `SELECT sp."userId", sp."createdAt", sp."postId", u.id, u.name 
        ${from}
        JOIN "sharedPosts" sp ON sp."userId" = u.id
        JOIN posts p ON p.id = sp."postId"
        JOIN "postStatus" s ON s.id = p."statusId"
        ${filter}`
    );

    const reposts = repostsResult.rows;
    const repostsInfo = [];
    for (let i = 0; i < reposts.length; i++) {
        const postId = reposts[i].postId;
        const filter = `WHERE p.id = ${postId} AND s.id != 3`;

        const post = await getPostsByFilter(from, filter, limit);

        if (post.length > 0) {
            repostsInfo.push({
                ...post[0],
                repostInfo: {
                    userId: reposts[i].userId,
                    userName: reposts[i].name,
                },
                createdAt: reposts[i].createdAt,
            });
        }
    }

    return repostsInfo;
}

export async function getAllPostsFromUsersFollowed(userId, limit) {
    const FILTER = `
        WHERE s.id != 3
        AND f."followerId" = ${sqlstring.escape(userId)}
    `;

    const from = `FROM followers f
    JOIN users flwed ON f."followedId" = flwed.id
    JOIN users flw ON f."followerId" = flw.id
    RIGHT JOIN users u ON f."followedId" = u.id
`;
    const posts = await getPostsByFilter(from, FILTER, limit);
    const reposts = await getRepostsByFilter(from, FILTER, limit);
    if (reposts.length > 0) {
        for (let i = 0; i < reposts.length; i++) {
            posts.push(reposts[i]);
        }
    }

    return posts;
}

export async function getNumberPostsTimeLine(userId) {
    const FILTER = `
        WHERE s.id != 3
        AND f."followerId" = ${userId}
    `;

    return await getNumberOfPosts(FILTER);
}

export async function getAllPostByUser(id, limit) {
    const FILTER = `WHERE u.id = ${SqlString.escape(id)} AND p."statusId" != 3`;
    const from = `FROM users u`;
    const posts = await getPostsByFilter(from, FILTER, limit);

    const reposts = await getRepostsByFilter(from, FILTER, limit);
    if (reposts.length > 0) {
        for (let i = 0; i < reposts.length; i++) {
            posts.push(reposts[i]);
        }
    }

    return posts;
}

export async function getPostById(postId) {
    const { rows: post } = await db.query(
        `SELECT * FROM "posts" WHERE id = $1`,
        [postId]
    );

    return post;
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

export async function infoRepost(postId) {
    const repostResult = await db.query(
        `SELECT COUNT(*) AS reposts
        FROM "sharedPosts"
        WHERE "postId" = $1`,
        [postId]
    );

    let reposts;

    if (repostResult.rowCount === 0) {
        reposts = 0;
    } else {
        reposts = repostResult.rows[0].reposts;
    }
    return reposts;
}

export async function commentOnPostRepository(postId, userId, commentText) {
    await db.query(
        `INSERT INTO "comments" ("postId", "userId", "text")
        VALUES ($1, $2, $3)`,
        [postId, userId, commentText]
    );

    return await getPostCommentsRepository(userId, postId);
}

export async function getPostCommentsRepository(userId, postId) {
    const { rows: comments } = await db.query(
        `SELECT 
            u.id,
            u.name,
            u.image, 
            c."text" AS "commentText",
            CASE
                WHEN c."userId" = p."userId"  THEN 'author'
                WHEN EXISTS (
                    select 1 from followers f2
                    where f2."followerId" = $1 and f2."followedId" = u.id
                ) THEN 'following'
                ELSE ''
            END AS "state"
        FROM "comments" c
        JOIN "users" u ON c."userId" = u.id
        JOIN "posts" p ON c."postId" = p.id
        WHERE c."postId" = $2`,
        [userId, postId]
    );

    return comments;
}
