import urlMetadata from "url-metadata";

export default async function getMetadataUrl(url) {
  const {title, description, image} = await urlMetadata(url);
  return {title, description, image};
}