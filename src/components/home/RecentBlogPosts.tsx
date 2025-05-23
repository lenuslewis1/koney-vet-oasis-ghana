
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAllBlogPosts, BlogPost } from '@/lib/contentful';
import { formatDistance } from 'date-fns';
import { ArrowRight } from 'lucide-react';

const RecentBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { posts } = await getAllBlogPosts();
      setPosts(posts.slice(0, 3)); // Get only the 3 most recent posts
      setLoading(false);
    };
    
    fetchPosts();
  }, []);

  if (loading && posts.length === 0) {
    return null; // Don't show anything while loading initially
  }

  return (
    <section className="py-16 bg-vet-light">
      <div className="container-custom">
        <div className="flex flex-wrap justify-between items-center mb-10">
          <div>
            <span className="text-vet-teal font-medium">Stay Updated</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-vet-dark mt-2">
              Latest From Our Blog
            </h2>
          </div>
          
          <Link to="/blog">
            <Button variant="outline" className="text-vet-blue border-vet-blue hover:bg-vet-blue hover:text-white flex items-center gap-2">
              View All Posts
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Link to={`/blog/${post.fields.slug}`} key={post.sys.id}>
                <Card className="h-full hover:shadow-lg transition-all">
                  <div className="h-48 overflow-hidden">
                    {post.fields.featuredImage && (
                      <img 
                        src={post.fields.featuredImage.fields.file.url} 
                        alt={post.fields.featuredImage.fields.title || post.fields.title} 
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  
                  <CardContent className="pt-6">
                    <div className="text-sm text-vet-blue mb-2">
                      {post.fields.publishDate && (
                        <span>
                          {formatDistance(new Date(post.fields.publishDate), new Date(), { addSuffix: true })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-display font-bold mb-2">{post.fields.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{post.fields.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="ghost" className="text-vet-blue font-semibold hover:text-vet-teal">
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <h3 className="text-xl font-medium mb-2">No blog posts yet</h3>
              <p className="text-gray-600">Check back soon for new content</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RecentBlogPosts;
