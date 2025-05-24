
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { getBlogPostBySlug, BlogPost } from '@/lib/sanity';
import { formatDistance } from 'date-fns';
import { ChevronLeft, Loader2, Calendar, User } from 'lucide-react';
import { PortableText } from '@portabletext/react';

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      const { post, error } = await getBlogPostBySlug(slug);
      
      if (error) {
        setError(error as Error);
      } else if (post) {
        setPost(post);
      }
      
      setLoading(false);
    };
    
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-10 w-10 animate-spin text-vet-blue" />
        </div>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog')} className="bg-vet-blue hover:bg-vet-teal">
            Back to Blog
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <PageHeader 
        title={post.title}
        bgImage={post.featuredImage?.asset.url || "https://images.unsplash.com/photo-1600272006232-a9653d91c8a5?auto=format&fit=crop&q=80"}
        breadcrumbs={[
          { label: 'Blog', path: '/blog' },
          { label: post.title, path: `/blog/${post.slug.current}` }
        ]}
      />
      
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          <Link to="/blog" className="flex items-center text-vet-blue hover:text-vet-teal mb-8">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to all posts
          </Link>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {post.featuredImage && (
              <div className="h-64 md:h-96 overflow-hidden">
                <img 
                  src={post.featuredImage.asset.url} 
                  alt={post.featuredImage.alt || post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="p-6 md:p-10">
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                {post.publishDate && (
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <time dateTime={post.publishDate}>
                      {formatDistance(new Date(post.publishDate), new Date(), { addSuffix: true })}
                    </time>
                  </div>
                )}
                
                {post.author && (
                  <div className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    <span>{post.author.name}</span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-6">{post.title}</h1>
              
              <div className="prose max-w-none">
                {post.content && <PortableText value={post.content} />}
              </div>
              
              {post.categories && post.categories.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-vet-light text-vet-blue text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BlogPostPage;
