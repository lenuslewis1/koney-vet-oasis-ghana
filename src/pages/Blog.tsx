
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { getAllBlogPosts, BlogPost } from '@/lib/sanity';
import { formatDistance } from 'date-fns';
import { Loader2 } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { posts, error } = await getAllBlogPosts();
      
      if (error) {
        setError(error as Error);
      } else {
        setPosts(posts);
      }
      
      setLoading(false);
    };
    
    fetchPosts();
  }, []);

  return (
    <MainLayout>
      <PageHeader 
        title="Our Blog" 
        description="Latest news, tips, and insights about pet care and veterinary services" 
        bgImage="https://images.unsplash.com/photo-1600272006232-a9653d91c8a5?auto=format&fit=crop&q=80"
        breadcrumbs={[{ label: 'Blog', path: '/blog' }]}
      />
      
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-10 w-10 animate-spin text-vet-blue" />
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold text-red-500 mb-2">Unable to load blog posts</h3>
              <p className="text-gray-600">Please try again later</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-xl font-semibold mb-2">No blog posts found</h3>
              <p className="text-gray-600">Check back soon for new content</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link to={`/blog/${post.slug.current}`} key={post._id}>
                  <Card className="h-full transition-all hover:shadow-lg">
                    <CardHeader className="p-0">
                      {post.featuredImage && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={post.featuredImage.asset.url} 
                            alt={post.featuredImage.alt || post.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="text-sm text-vet-blue mb-2">
                        {post.publishDate && (
                          <span>
                            {formatDistance(new Date(post.publishDate), new Date(), { addSuffix: true })}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-display font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-600">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" className="text-vet-blue font-semibold hover:text-vet-teal">
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
};

export default Blog;
