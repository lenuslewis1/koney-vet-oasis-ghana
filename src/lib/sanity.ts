
import { createClient } from '@sanity/client';

// Sanity configuration
// These would typically be stored in environment variables
export const sanityClient = createClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID (must contain only a-z, 0-9, and dashes)
  dataset: 'production', // or the name of your dataset
  useCdn: true, // Enable CDN for faster response times
  apiVersion: '2023-05-03', // Use current date or latest API version
});

// Type definitions for blog content
export interface BlogPost {
  _id: string;
  _type: 'blogPost';
  title: string;
  slug: {
    current: string;
  };
  publishDate: string;
  featuredImage?: {
    asset: {
      _ref: string;
      url?: string;
    };
    alt?: string;
  };
  excerpt: string;
  content: any[]; // Portable Text content
  author?: {
    name: string;
    image?: {
      asset: {
        _ref: string;
        url?: string;
      };
    };
  };
  categories?: string[];
}

// Function to get all blog posts
export const getAllBlogPosts = async () => {
  try {
    const query = `*[_type == "blogPost"] | order(publishDate desc) {
      _id,
      title,
      slug,
      publishDate,
      excerpt,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        image{
          asset->{
            _id,
            url
          }
        }
      },
      categories
    }`;
    
    const posts = await sanityClient.fetch<BlogPost[]>(query);
    
    return { 
      posts,
      error: null
    };
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return { 
      posts: [],
      error 
    };
  }
};

// Function to get a single blog post by slug
export const getBlogPostBySlug = async (slug: string) => {
  try {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishDate,
      excerpt,
      content,
      featuredImage{
        asset->{
          _id,
          url
        },
        alt
      },
      author->{
        name,
        image{
          asset->{
            _id,
            url
          }
        }
      },
      categories
    }`;
    
    const post = await sanityClient.fetch<BlogPost>(query, { slug });
    
    if (!post) {
      throw new Error('Blog post not found');
    }
    
    return { 
      post,
      error: null
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return { 
      post: null,
      error 
    };
  }
};
