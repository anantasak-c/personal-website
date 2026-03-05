import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your-project-id",
  dataset: import.meta.env.VITE_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
  return builder.image(source);
}

export const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  description,
  tags,
  publishedAt,
  readTime,
  coverImage
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  tags,
  publishedAt,
  readTime,
  coverImage,
  body
}`;

export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
  _id,
  title,
  "slug": slug.current,
  description,
  tags,
  publishedAt,
  readTime
}`;
