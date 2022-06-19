import db from "./../config/db.js";

export async function getUserByPostId(postId){
    const user = await db.query(
        `SELECT "userId" FROM "posts" WHERE id = $1`,[postId]
    );
    return user.rows[0];
};

export async function postDeleter(postId){
    console.log("postDeleter", postId);
    await db.query(
        `UPDATE "posts" SET "statusId" = 3 WHERE id = $1`,[postId]
    );
};