import { createClient } from "@sanity/client";
import { supabase } from "@/integrations/supabase/client";

const client = createClient({
  projectId: "fqp1d8a4", // updated with your Sanity project ID
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: false,
  token: "",
});

export async function getSanityBlogs() {
  const query = `*[_type == "post"] | order(publishedAt desc){
    _id,
    title,
    body,
    mainImage{asset->{url}},
    publishedAt
  }`;
  return await client.fetch(query);
}

export async function createSanityBlog(
  title: string,
  body: string,
  imageUrl: string
) {
  const doc: any = {
    _type: "post",
    title,
    body,
    mainImage: imageUrl
      ? { asset: { _type: "reference", _ref: await uploadImage(imageUrl) } }
      : undefined,
    publishedAt: new Date().toISOString(),
  };
  return await client.create(doc);
}

async function uploadImage(imageUrl: string): Promise<string> {
  // If the imageUrl is already a Sanity asset, just return its ref
  if (imageUrl.startsWith("image-")) return imageUrl;
  // Otherwise, upload the image to Sanity
  const res = await fetch(imageUrl);
  const blob = await res.blob();
  const asset = await client.assets.upload("image", blob, {
    filename: "blog-image.jpg",
  });
  return asset._id;
}
