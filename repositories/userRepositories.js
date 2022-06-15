import db from "./../config/db.js";

export async function getPostsByUser(id){
    const posts = await db.query(
        `SELECT "postBody", link, id FROM posts
        WHERE "userId" = $1
        ORDER BY "createdAt" DESC;`,
        [id]
    );
    return posts.rows;
};

export async function getUserById(id){
    const user = await db.query(
        `SELECT name, image, id FROM users
        WHERE id = $1;`,
        [id]
    );

    return user.rows;
}

export async function getUsersByName(filter){
    const users = await db.query(
        `SELECT name, id, image FROM users
        WHERE name ILIKE $1`,
        [filter]
    );

    return users.rows;
}