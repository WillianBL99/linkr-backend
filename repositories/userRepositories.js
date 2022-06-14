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

const userRepostory = {
    createUser,
    getUserEmail,
    getUserName
}

export default userRepostory;