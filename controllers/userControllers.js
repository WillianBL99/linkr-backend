import db from "./../config/db.js";

export async function getUserPosts(req, res) {
    const { id } = req.params;

    try {
        const userResult = await db.query(
            `SELECT name, image, id FROM users
            WHERE id = $1;`,
            [id]
        );

        if (userResult.rows.length === 0) {
            res.sendStatus(404);
            return;
        }

        const user = userResult.rows[0];

        const userPostsResult = await db.query(
            `SELECT "postBody", link, id FROM posts
            WHERE "userId" = $1
            ORDER BY "createdAt" DESC;`,
            [id]
        );

        const userPosts = userPostsResult.rows;

        user.posts = userPosts;

        res.status(200).send(user);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}

export async function getUsers(req, res) {
    const { name } = req.params;

    const filter = name + "%";

    try {
        const usersResult = await db.query(
            `SELECT name, id, image FROM users
            WHERE name ILIKE $1`,
            [filter]
        );

        const users = usersResult.rows;
        res.status(200).send(users);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}