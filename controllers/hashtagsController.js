import { getHashtagsRepository } from "../repositories/hashtagsRepositories.js";

export async function getHashtags(req, res) {
    try{
        const hashtagsRows = await getHashtagsRepository();
        
        const hashtags = hashtagsRows.map((obj) => {
            return obj.name;
        });
        
        res.status(200).send(hashtags);
    }catch(error){
        console.log("Error in getHashtags", error);
        res.sendStatus(500); 
    }
};