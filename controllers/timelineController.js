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
    await createPost(req.body);
    res.sendStatus(200);

  } catch (e) {
    console.log("Error in postOnTimeline", e);
    res.sendStatus(500);    
  }
}