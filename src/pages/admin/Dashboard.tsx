import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getSanityBlogs } from "@/lib/sanityBlogs";
import { Package, ShoppingCart, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#2563eb", "#facc15", "#22c55e", "#ef4444"];
const STATUS_LABELS = ["pending", "processing", "completed", "cancelled"];

const Dashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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

  // Analytics: Orders per day (last 7 days)
  const ordersPerDay = (() => {
    const days: { date: string; count: number }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toLocaleDateString();
      days.push({ date: dateStr, count: 0 });
    }
    orders.forEach((order) => {
      const d = new Date(order.created_at).toLocaleDateString();
      const found = days.find((day) => day.date === d);
      if (found) found.count++;
    });
    return days;
  })();

  // Analytics: Order status distribution
  const statusCounts = STATUS_LABELS.map((status) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: orders.filter((o) => o.status === status).length,
  }));

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          Admin Dashboard Overview
        </h1>
        <div className="flex gap-2">
          <button
            className="btn-primary"
            onClick={() => navigate("/admin/products")}
          >
            Add Product
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate("/admin/blog")}
          >
            Add Blog Post
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-5 rounded-lg shadow transition-custom"
            onClick={() => navigate("/admin/orders")}
          >
            View Orders
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Orders per day bar chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Orders Per Day (Last 7 Days)
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ordersPerDay}>
              <XAxis dataKey="date" fontSize={12} />
              <YAxis allowDecimals={false} fontSize={12} />
              <Tooltip />
              <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Order status pie chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Order Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {statusCounts.map((entry, idx) => (
                  <Cell
                    key={`cell-${idx}`}
                    fill={COLORS[idx % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
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
