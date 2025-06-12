import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  body: string;
  image_url?: string;
  published_at?: string;
}

const FeaturedBlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("*")
          .order("published_at", { ascending: false })
          .limit(3); // Get 3 featured posts

        if (error) {
          throw error;
        }
        setPosts(data || []);
      } catch (err: any) {
        console.error("Error fetching featured posts:", err);
        setError(err?.message || "Failed to fetch featured blog posts");
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPosts();
  }, []);

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

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-2">
              Our Latest Articles
            </h2>
            <p className="text-gray-600">Loading latest articles...</p>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-red-600">
          <p>Error loading featured blog posts: {error}</p>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show the section if there are no posts
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-2">
            Our Latest Articles
          </h2>
          <p className="text-gray-600">
            Stay updated with our newest insights and pet care tips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
              whileHover={{
                scale: 1.03,
                boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link to={`/blog/${post.id}`}>
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {formatDate(post.published_at)}
                  </p>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-3">{post.body}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/blog"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Blog Posts
            <ArrowRight className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogPosts;
