import db from "./../config/db.js";

export async function getUserByPostId(postId){
    const user = await db.query(
        `SELECT "userId" FROM "posts" WHERE id = $1`,[postId]
    );
    return user.rows[0];
};

export async function postDeleter(postId){
    await db.query(
        `DELETE FROM "posts" WHERE id = $1`,[postId]
    );
};

export async function postUpdate(postId, newText) {
    await db.query(`
        UPDATE posts
        SET "postBody = $1"
        WHERE id = $2`,
    [newText, postId]
    );
}