import bcrypt from "bcrypt";

import db from "../config/db.js";

async function getUserEmail(email) {
    return db.query(
        `
        SELECT * 
        FROM users 
        WHERE email = $1`,
        [email]
    );
}

async function getUserName(name) {
    return db.query(
        `
        SELECT * 
        FROM users 
        WHERE name = $1`,
        [name]
    );
}

async function checkNameEmail(name, email) {
    return db.query(
        `
        SELECT * 
        FROM users 
        WHERE name = $1 OR email = $2`,
        [name, email]
    );
}

async function createUser(name, email, password, imgUrl) {
    const key = 10;
    const passwordHash = bcrypt.hashSync(password, key);
    return db.query(
        `
        INSERT
        INTO users (name, password, email, image)
        VALUES ($1, $2, $3, $4)`,
        [name, passwordHash, email, imgUrl]
    );
}

export async function getUserById(id) {
    const user = await db.query(
        `SELECT name, image, id FROM users
        WHERE id = $1;`,
        [id]
    );

    return user.rows;
}

export async function getUsersByName(filter) {
    const users = await db.query(
        `SELECT u.name, u.id, u.image FROM users u
        WHERE u.name ILIKE $1
        ORDER BY u.name;`,
        [filter]
    );

    return users.rows;
}

export async function getUsersByNameOrderedByFollowing(userId, filter) {
    const users = await getUsersByName(filter);
    for (let i = 0; i < users.length; i++) {
        const follow = await getConnectionFollow(users[i].id, userId);
        if (follow) {
            users[i].following = true;
        } else {
            users[i].following = false;
        }
    }

    users.sort((a, b) => {
        if (a.following && !b.following) {
            return -1;
        } else if (!a.following && b.following) {
            return 1;
        } else {
            return 0;
        }
    });

    return users;
}

const userRepostory = {
    createUser,
    getUserEmail,
    getUserName,
    checkNameEmail,
    getUserById,
    getUsersByNameOrderedByFollowing,
};

export default userRepostory;

export async function getConnectionsFollow(userId) {
    const { rows: connections } = await db.query(
        `SELECT * FROM followers
        WHERE "followerId" = $1`,
        [userId]
    );

    return connections;
}

export async function getConnectionFollow(userId, followerId) {
    const {
        rows: [connection],
    } = await db.query(
        `SELECT * FROM "followers"
        WHERE "followedId" = $1 AND "followerId" = $2`,
        [userId, followerId]
    );

    return connection;
}

export async function followUserRepository(userId, followerId) {
    await db.query(
        `INSERT INTO "followers" ("followerId", "followedId")
        VALUES ($1, $2);`,
        [followerId, userId]
    );

    return;
}

export async function unfollowUserRepository(userId, followerId) {
    await db.query(
        `DELETE FROM "followers"
        WHERE "followerId" = $1 AND "followedId" = $2;`,
        [followerId, userId]
    );

    return;
}
