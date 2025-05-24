import { Post } from './sanity';

// Mock data for blog posts to use while Sanity integration is being set up
export const mockPosts: Post[] = [
  {
    _id: '1',
    title: 'Preventive Care: Essential Vaccinations for Pets in Ghana',
    slug: { current: 'preventive-care-essential-vaccinations-ghana' },
    publishedAt: new Date().toISOString(),
    authorName: 'Dr. Koney',
    categories: ['Pet Health', 'Preventive Care'],
    excerpt: 'Learn about the essential vaccinations your pets need in Ghana\'s unique climate and environment to ensure they stay healthy and protected year-round.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'At Koney Vet Oasis Ghana, we understand that preventive care is the foundation of your pet\'s health. In Ghana\'s tropical climate, pets face unique health challenges that make vaccinations particularly important.'
          }
        ]
      }
    ]
  },
  {
    _id: '2',
    title: 'Year-Round Parasite Prevention: Protecting Your Pets in Ghana\'s Climate',
    slug: { current: 'parasite-prevention-ghana-climate' },
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // Yesterday
    authorName: 'Dr. Koney',
    categories: ['Pet Health', 'Preventive Care', 'Parasites'],
    excerpt: 'Ghana\'s tropical climate creates ideal conditions for parasites year-round. Learn how to protect your pets from fleas, ticks, heartworms, and other common parasites in our unique environment.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'In Ghana\'s warm, humid climate, parasites don\'t take a break. Unlike temperate regions where some parasites become dormant during colder months, our tropical environment allows parasites to thrive year-round, making consistent parasite prevention essential for your pet\'s health.'
          }
        ]
      }
    ]
  },
  {
    _id: '3',
    title: 'Proper Nutrition for Pets in Ghana: Local Options and Dietary Guidelines',
    slug: { current: 'proper-nutrition-pets-ghana-local-options' },
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    authorName: 'Dr. Koney',
    categories: ['Pet Health', 'Nutrition', 'Pet Care'],
    excerpt: 'Discover the best nutritional practices for your pets in Ghana, including locally available options, proper dietary guidelines, and how to ensure your pet receives balanced nutrition despite limited commercial options.',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Proper nutrition is the foundation of your pet\'s health and wellbeing. In Ghana, pet owners face unique challenges when it comes to providing optimal nutrition, including limited availability of commercial pet foods and concerns about the quality and freshness of imported products.'
          }
        ]
      }
    ]
  }
];

// Function to get all mock posts
export const getMockPosts = (): Post[] => {
  return mockPosts;
};

// Function to get a single mock post by slug
export const getMockPostBySlug = (slug: string): Post | null => {
  return mockPosts.find(post => post.slug.current === slug) || null;
};

// Function to get featured mock posts
export const getMockFeaturedPosts = (limit: number = 3): Post[] => {
  return mockPosts.slice(0, limit);
};

// Function to get mock posts by category
export const getMockPostsByCategory = (category: string): Post[] => {
  return mockPosts.filter(post => post.categories?.includes(category));
};
