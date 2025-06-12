import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSanityBlogs } from "@/lib/sanityBlogs";
import { Package, ShoppingCart, FileText, Loader2 } from "lucide-react";

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      setError(null);
      try {
        const [
          { data: productsData, error: productsError },
          { data: ordersData, error: ordersError },
          blogsData,
        ] = await Promise.all([
          supabase
            .from("products")
            .select("*")
            .order("created_at", { ascending: false }),
          supabase
            .from("orders")
            .select("*")
            .order("created_at", { ascending: false }),
          getSanityBlogs(),
        ]);
        if (productsError) throw productsError;
        if (ordersError) throw ordersError;
        setProducts(productsData || []);
        setOrders(ordersData || []);
        setBlogs(blogsData || []);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">
        Admin Dashboard Overview
      </h1>
      {error ? (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-sm">
          {error}
        </div>
      ) : loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        </div>
      ) : (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Products</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {products.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Orders</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {orders.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Blog Posts</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {blogs.length}
                </p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Recent Products */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-3">Recent Products</h2>
              <ul className="divide-y divide-gray-100">
                {products.slice(0, 5).map((p) => (
                  <li key={p.id} className="py-2 flex items-center gap-3">
                    <img
                      src={p.image_url}
                      alt={p.name}
                      className="h-8 w-8 rounded object-cover border"
                    />
                    <span className="font-medium text-gray-800">{p.name}</span>
                  </li>
                ))}
                {products.length === 0 && (
                  <li className="text-gray-500">No products yet.</li>
                )}
              </ul>
            </div>
            {/* Recent Orders */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-3">Recent Orders</h2>
              <ul className="divide-y divide-gray-100">
                {orders.slice(0, 5).map((o) => (
                  <li key={o.id} className="py-2">
                    <span className="font-medium text-gray-800">
                      {o.customer_name}
                    </span>
                    <span className="ml-2 text-xs text-gray-500">
                      {o.created_at
                        ? new Date(o.created_at).toLocaleDateString()
                        : ""}
                    </span>
                  </li>
                ))}
                {orders.length === 0 && (
                  <li className="text-gray-500">No orders yet.</li>
                )}
              </ul>
            </div>
            {/* Recent Blogs */}
            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-3">Recent Blog Posts</h2>
              <ul className="divide-y divide-gray-100">
                {blogs.slice(0, 5).map((b: any) => (
                  <li key={b._id} className="py-2 flex items-center gap-3">
                    {b.mainImage?.asset?.url && (
                      <img
                        src={b.mainImage.asset.url}
                        alt={b.title}
                        className="h-8 w-8 rounded object-cover border"
                      />
                    )}
                    <span className="font-medium text-gray-800">{b.title}</span>
                  </li>
                ))}
                {blogs.length === 0 && (
                  <li className="text-gray-500">No blog posts yet.</li>
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
