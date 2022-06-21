import bcrypt from "bcrypt";

import db from "../config/db.js";

async function getUserEmail(email) {
    return db.query (`
        SELECT * 
        FROM users 
        WHERE email = $1`,
        [email]
    );
}

async function getUserName(name) {
    return db.query (`
        SELECT * 
        FROM users 
        WHERE name = $1`,
        [name]
    );
}

async function checkNameEmail(name, email) {
    return db.query (`
        SELECT * 
        FROM users 
        WHERE name = $1 OR email = $2`,
        [name, email]
    );
}

async function createUser(name, email, password, imgUrl) {
    const key = 10;
    const passwordHash = bcrypt.hashSync(password, key);
    return db.query (`
        INSERT
        INTO users (name, password, email, image)
        VALUES ($1, $2, $3, $4)`,
        [name, passwordHash, email, imgUrl]
    );
}

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

const userRepostory = {
    createUser,
    getUserEmail,
    getUserName,
    checkNameEmail,
    getUserById,
    getUsersByName
}

export default userRepostory;
