import db from "../config/db.js";

export async function getTimelineRepository( userId ) {
  const timeline = await db.query(`
    SELECT 
      u.name, 
      u.image, 
      p.id AS "postId", 
      p."userId", 
      COALESCE(p."postBody", '') AS "postBody",
      s.name AS "postStatus",
      l.link,
      l.title,
      l.image AS "imageLink"
    FROM users u
    JOIN posts p ON u.id = p."userId"
    JOIN "postStatus" s ON p."statusId" = s.id
    JOIN links l ON p."linkId" = l.id
    ORDER BY p."createdAt" DESC
    LIMIT 20
  `);
  return timeline.rows;
}

export async function postOnTimelineRepository(userId, linkId, post) {
  const { postBody } = post;
  const body = postBody === '' ? null : postBody;

  const {rows: [{id}]} = await db.query(`
    INSERT INTO posts ("userId", "postBody", "linkId")
    VALUES ($1, $2, $3)
    RETURNING id
  `, [userId, body, linkId]);
  
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

export async function insertHashtagsPost(hashtagsValues) {
  console.log(hashtagsValues);
  await db.query(`
    INSERT INTO "hashtagsPosts" ("postId", "hashtagId")
    VALUES ${hashtagsValues}
  `);
}

export async function handleLikeRepository(userId, postId, isLiked) {
  if( isLiked ) {
    await db.query(`
      INSERT INTO "likesPosts" ("userId", "postId")
      VALUES ($1, $2)
    `, [userId, postId]);
  } else {
    await db.query(`
      DELETE FROM "likesPosts"
      WHERE "userId" = $1 AND "postId" = $2
    `, [userId, postId]);
  }

  return await infoLikes(userId, postId);
}

export async function infoLikes(userId, postId) {
  const {rows: [{ likes }]} = await db.query(`
    SELECT COUNT(*) AS "likes"
    FROM "likesPosts"
    WHERE "postId" = $1
  `, [postId]);

  const {rows:liked} = await db.query(`
    SELECT * FROM "likesPosts"
    WHERE "userId" = $1 AND "postId" = $2
  `, [userId, postId]);

  const { rows: names } = await db.query(`
    SELECT u.name
    FROM "likesPosts" lp
    JOIN users u ON lp."userId" = u.id
    WHERE lp."postId" = $1 AND lp."userId" != $2
    ORDER BY lp.id DESC
    LIMIT 2
    
  `, [postId, userId]);

  const namePeople = names.map(name => name.name);

  return {
    likes, 
    liked: liked.length > 0,
    namePeople
  };
}

export async function insertLink(link, metadata) {
  const { title, description, image } = metadata;
  const {rows : [{ id }]} = await db.query(`
    INSERT INTO links (link, title, description, image)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `, [link, title, description, image]);

  return id;
}
