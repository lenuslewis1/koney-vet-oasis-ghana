import { client } from './sanity';

// This proxy function will help bypass CORS issues
export async function fetchSanityData(query: string, params?: any) {
  try {
    // Use the Sanity client directly, which handles authentication and CORS
    const result = await client.fetch(query, params);
    return result;
  } catch (error) {
    console.error('Error fetching data from Sanity:', error);
    throw error;
  }
}

// Function to fetch all blog posts using the proxy
export const getAllPostsProxy = async () => {
  try {
    return await fetchSanityData(
      `*[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "categories": categories[]->title,
        excerpt
      }`
    );
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Function to fetch posts by category
export const getPostsByCategory = async (category: string) => {
  try {
    return await fetchSanityData(
      `*[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "categories": categories[]->title,
        excerpt
      }`,
      { category }
    );
  } catch (error) {
    console.error('Error fetching posts by category:', error);
    return [];
  }
};

// Function to fetch featured posts using the proxy
export const getFeaturedPostsProxy = async (limit: number = 3) => {
  try {
    return await fetchSanityData(
      `*[_type == "post"] | order(publishedAt desc)[0...$limit] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "categories": categories[]->title,
        excerpt
      }`,
      { limit: limit - 1 }
    );
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    return [];
  }
};

// Function to fetch a single post by slug using the proxy
export const getPostBySlugProxy = async (slug: string) => {
  try {
    return await fetchSanityData(
      `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        mainImage,
        publishedAt,
        "authorName": author->name,
        "authorImage": author->image,
        "categories": categories[]->title,
        body
      }`,
      { slug }
    );
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};
