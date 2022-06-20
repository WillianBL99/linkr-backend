import db from "../config/db.js";

async function createSessions(userId, token) {
    return db.query(`
        INSERT
        INTO sessions ("userId", token)
        VALUES ($1, $2);`,
        [userId, token]
    );
}

export async function getSession(token) {
    return db.query(`
    SELECT *
    FROM sessions
    WHERE token =$1`,
    [token]
    );
}

const sessionsRepository = {
    createSessions,
    getSession
}

export default sessionsRepository;