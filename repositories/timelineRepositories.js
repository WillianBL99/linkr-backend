import db from "../config/db.js";

export async function getTimelineRepository() {
  const timeline = await db.query(`
    SELECT u.name, u.image, COALESCE(p."postBody", '') AS "postBody", p.link
    FROM users u
    JOIN posts p ON u.id = p."userId"
    ORDER BY p."createdAt" DESC
    LIMIT 20
  `);
  return timeline.rows;
}

export async function postOnTimelineRepository(userId, post) {
  const { postBody, link } = post;
  const body = postBody === '' ? null : postBody;

  const {rows: [{id}]} = await db.query(`
    INSERT INTO posts ("userId", "postBody", link)
    VALUES ($1, $2, $3)
    RETURNING id
  `, [userId, body, link]);
  
  return id;
}

export async function getHashtagByName(name) {
  const hashtagQuery = await db.query(`
    SELECT id
    FROM hashtags
    WHERE name = $1
  `, [name]);

  return hashtagQuery.rows[0] ? hashtagQuery.rows[0].id : undefined;
}

export async function createHashtag(name) {
  const { rows: [{id}] } = await db.query(`
    INSERT INTO hashtags (name)
    VALUES ($1)
    RETURNING id
  `, [name]);

  return id;
}

export async function insertHashtagsPost(hashtagId) {
  await db.query(`
    INSERT INTO "hashtagsPosts" ("postId", "hashtagId")
    VALUES ${hashtagId}
  `);
}

export async function handleLikeRepository(userId, postId, liked) {
  if( liked ) {
    await db.query(`
      INSERT INTO "likes" ("userId", "postId")
      VALUES ($1, $2)
    `, [userId, postId]);
  } else {
    await db.query(`
      DELETE FROM "likes"
      WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
  }
}