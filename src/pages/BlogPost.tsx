import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import { supabase } from "@/integrations/supabase/client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Calendar, Share2, Twitter, Facebook, Linkedin, Copy, Clock } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface BlogPost {
  id: string;
  title: string;
  body: string;
  image_url?: string;
  published_at?: string;
}

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("No blog post ID provided");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        console.log("Fetching blog post with ID:", id);

        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        if (!data) {
          console.error("No data returned for blog post ID:", id);
          throw new Error("Blog post not found");
        }

        console.log("Successfully fetched blog post:", data);
        setPost(data as BlogPost);
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setError(err?.message || "Failed to fetch blog post");
        // Redirect to blog list after a short delay if the post is not found
        if (err?.message === "Blog post not found") {
          setTimeout(() => {
            navigate("/blog");
          }, 3000);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const formatDate = (dateString: string): string => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const estimateReadingTime = (text: string): number => {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="container mx-auto px-4 py-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center space-y-6 min-h-[400px]"
            >
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
                <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-r-primary/40 animate-pulse"></div>
              </div>
              <div className="text-center space-y-2">
                <p className="text-lg font-medium text-gray-700">Loading blog post...</p>
                <p className="text-sm text-gray-500">Please wait while we fetch the content</p>
              </div>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error || !post) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100">
          <div className="container mx-auto px-4 py-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">📄</span>
              </div>
              <h1 className="text-3xl font-bold mb-4 text-gray-900">Blog Post Not Found</h1>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {error ||
                  "The blog post you are looking for does not exist or has been removed. It might have been moved or deleted."}
              </p>
              <button
                onClick={() => navigate("/blog")}
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Blog
              </button>
            </motion.div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        {/* Back Navigation */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate("/blog")}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>
          </div>
        </div>

        <article className="container mx-auto px-4 py-8 max-w-4xl">
          <motion.header 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              {post.body && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{estimateReadingTime(post.body)} min read</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.image_url && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl mb-12"
              >
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '16/9' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>
            )}
          </motion.header>

          {/* Article Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12"
          >
            <div className="prose prose-lg prose-blue max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-black text-gray-900 mb-6 mt-8 tracking-tight">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-black text-gray-800 mb-4 mt-8 tracking-tight">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-extrabold text-gray-800 mb-3 mt-6">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-lg font-extrabold text-gray-700 mb-2 mt-4">{children}</h4>,
                  h5: ({ children }) => <h5 className="text-base font-extrabold text-gray-700 mb-2 mt-4">{children}</h5>,
                  h6: ({ children }) => <h6 className="text-sm font-extrabold text-gray-700 mb-2 mt-4">{children}</h6>,
                  p: ({ children }) => <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line text-base">{children}</p>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary bg-blue-50 pl-6 py-4 my-6 italic text-gray-700 font-medium">
                      {children}
                    </blockquote>
                  ),
                  ul: ({ children }) => <ul className="list-none pl-6 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-none pl-6 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700 flex gap-2"><span className="text-primary">•</span>{children}</li>,
                  code: ({ children }) => (
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">{children}</code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6">{children}</pre>
                  ),
                  strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                }}
              >
                {post.body}
              </ReactMarkdown>
            </div>
          </motion.div>

          {/* Share Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Share2 className="w-6 h-6 text-primary" />
              <h3 className="text-2xl font-bold text-gray-900">Share this article</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  post.title
                )}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-400 hover:bg-blue-500 text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                <Twitter className="w-5 h-5" />
                <span className="hidden sm:inline">Twitter</span>
              </a>
              
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                <Facebook className="w-5 h-5" />
                <span className="hidden sm:inline">Facebook</span>
              </a>
              
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  window.location.href
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                <Linkedin className="w-5 h-5" />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg transition-colors font-medium"
              >
                <Copy className="w-5 h-5" />
                <span className="hidden sm:inline">Copy Link</span>
              </button>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                💡 <strong>Found this helpful?</strong> Share it with others who might benefit from this information!
              </p>
            </div>
          </motion.div>
        </article>
      </div>
    </MainLayout>
  );
};

export default BlogPost;
