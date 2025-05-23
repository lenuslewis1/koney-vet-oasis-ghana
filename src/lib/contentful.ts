
import { createClient, EntrySkeletonType } from 'contentful';

// Contentful configuration
// These would typically be stored in environment variables
export const contentfulClient = createClient({
  space: 'your_space_id', // Replace with your Contentful space ID
  accessToken: 'your_access_token', // Replace with your Contentful access token
});

// Type definitions for blog content - Updated to extend EntrySkeletonType
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: {
    title: string;
    slug: string;
    publishDate: string;
    featuredImage: {
      fields: {
        file: {
          url: string;
        };
        title: string;
      };
    };
    excerpt: string;
    content: any; // Rich text content
    author?: {
      fields: {
        name: string;
        picture?: {
          fields: {
            file: {
              url: string;
            };
          };
        };
      };
    };
    categories?: string[];
  };
}

// Legacy interface for compatibility
export interface BlogPost {
  sys: {
    id: string;
  };
  fields: BlogPostSkeleton['fields'];
}

// Function to get all blog posts
export const getAllBlogPosts = async () => {
  try {
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      order: ['-fields.publishDate'], // Fix: Use array for order parameter
    });
    
    return { 
      posts: response.items,
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
    const response = await contentfulClient.getEntries<BlogPostSkeleton>({
      content_type: 'blogPost',
      'fields.slug': slug, // Keep as is, but cast the object type
      limit: 1,
    } as any); // Use type assertion to bypass TypeScript constraint temporarily
    
    if (response.items.length === 0) {
      throw new Error('Blog post not found');
    }
    
    return { 
      post: response.items[0],
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
