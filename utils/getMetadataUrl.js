import urlMetadata from "url-metadata";

export default async function getMetadataUrl(url) {
    try {
        const { title, description, image } = await urlMetadata(url);
        return { title, description, image };
    } catch (e) {
        console.log(e);
        return undefined;
    }
}
