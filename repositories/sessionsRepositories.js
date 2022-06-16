import db from "../config/db.js";

async function createSessions(userId, token) {
    return db.query(`
        INSERT
        INTO sessions ("userId", token)
        VALUES ($1, $2);`,
        [userId, token]
    );
}

const sessionsRepository = {
    createSessions
}

export default sessionsRepository;