import getMetadataUrl from "../utils/getMetadataUrl.js";

export async function getTimeline(req, res) {
  try {
    const { timelineQuery } = res.locals;
    const timeline = [];
    for (let i = 0; i < timelineQuery.length; i++) {
      const link = timelineQuery[i].link;
      delete timelineQuery[i].link;
      const metadata = await getMetadataUrl(link);

      timeline.push({
        ...timelineQuery[i],
        metadata: {...metadata, link}
      });
    }  

    res.status(200).send(timeline);
    
  } catch (e) {
    console.log("Error in getTimeline", e);
    res.sendStatus(500);    
  }
}


export async function postOnTimeline(req, res) {
  try {
    const { hashtags } = req.body;

    const { id:postId } = await postOnTimelineRepository( res.locals.userId, req.body );
    const valuesToHashtagPost = "";

    for(let i = 0; i < hashtags.length; i++) {
      let {id} = await getHashtagByName(hashtags[i]);
      
      valuesToHashtagPost += `(${postId}, ${id || await createHashtag(hashtags[i])})`;
      if(i !== hashtags.length - 1) {
        valuesToHashtagPost += ",";
      }
    }

    await db.query(`
      INSERT INTO hashtags_posts (post_id, hashtag_id)
      VALUES ${valuesToHashtagPost}
    `);

    res.sendStatus(200);

  } catch (e) {
    console.log("Error in postOnTimeline", e);
    res.sendStatus(500);    
  }
}