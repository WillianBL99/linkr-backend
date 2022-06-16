import db from "../config/db.js";

export async function getTimelineRepository() {
  const timeline = await db.query(`
    SELECT u.name, u.image, p."postBody", p.link
    FROM users u
    JOIN posts p ON u.id = p."userId"
    ORDER BY p."createdAt" DESC
    LIMIT 20
  `);
  return timeline.rows;
}

export async function postOnTimelineRepository(userId, post) {
  const { postBody, link } = post;
  const postId = await db.query(`
    INSERT INTO posts ("userId", "postBody", link)
    VALUES ($1, $2, $3)
  `, [userId, postBody, link]);
  return;
}