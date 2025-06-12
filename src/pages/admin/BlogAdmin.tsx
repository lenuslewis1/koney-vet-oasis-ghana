import { useEffect, useState } from "react";
import { getSanityBlogs, createSanityBlog } from "@/lib/sanityBlogs";
import { Plus, Loader2 } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  body: string;
  mainImage?: { asset: { url: string } };
  publishedAt?: string;
}

const BlogAdmin = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", imageUrl: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getSanityBlogs();
      setBlogs(data);
    } catch (err: any) {
      setError(err?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await createSanityBlog(form.title, form.body, form.imageUrl);
      setShowForm(false);
      setForm({ title: "", body: "", imageUrl: "" });
      fetchBlogs();
    } catch (err: any) {
      setError(err?.message || "Failed to create blog");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
          onClick={() => setShowForm((v) => !v)}
        >
          <Plus size={20} className="mr-2" />
          {showForm ? "Cancel" : "New Blog Post"}
        </button>
      </div>
      {showForm && (
        <form
          onSubmit={handleCreate}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
          {error && (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:border-blue-500 focus:ring-blue-500"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              type="url"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:border-blue-500 focus:ring-blue-500"
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Body
            </label>
            <textarea
              required
              rows={5}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:border-blue-500 focus:ring-blue-500"
              value={form.body}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 border border-transparent rounded-lg shadow text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
            >
              {submitting ? "Posting..." : "Post Blog"}
            </button>
          </div>
        </form>
      )}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        </div>
      ) : blogs.length === 0 ? (
        <div className="text-gray-500 text-center py-8">
          No blog posts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white rounded-lg shadow p-4 flex flex-col"
            >
              {blog.mainImage?.asset?.url && (
                <img
                  src={blog.mainImage.asset.url}
                  alt={blog.title}
                  className="h-40 w-full object-cover rounded mb-3"
                />
              )}
              <h2 className="text-lg font-semibold mb-1">{blog.title}</h2>
              <div className="text-xs text-gray-500 mb-2">
                {blog.publishedAt
                  ? new Date(blog.publishedAt).toLocaleDateString()
                  : ""}
              </div>
              <div className="text-gray-700 text-sm line-clamp-3 mb-2">
                {blog.body}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogAdmin;
