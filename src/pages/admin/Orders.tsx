import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Loader2 } from "lucide-react";

type Order = Tables<"orders">;
type OrderItem = Tables<"order_items">;
type Product = Tables<"products">;

interface OrderWithItems extends Order {
  items: (OrderItem & { product?: Product })[];
}

const Orders = () => {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch orders
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        if (ordersError) throw ordersError;
        // Fetch order items for all orders
        const { data: itemsData, error: itemsError } = await supabase
          .from("order_items")
          .select("*");
        if (itemsError) throw itemsError;
        // Fetch products for item details
        const { data: productsData } = await supabase
          .from("products")
          .select("*");
        // Map items to orders
        const ordersWithItems: OrderWithItems[] = (ordersData || []).map(
          (order) => {
            const items = (itemsData || [])
              .filter((item) => item.order_id === order.id)
              .map((item) => ({
                ...item,
                product: productsData?.find((p) => p.id === item.product_id),
              }));
            return { ...order, items };
          }
        );
        setOrders(ordersWithItems);
      } catch (err: any) {
        setError(err?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Orders</h1>
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-sm">
          {error}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-gray-500 text-center py-8">No orders found.</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">
                      {order.customer_name}
                    </div>
                    <div className="text-gray-500">{order.customer_email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <ul className="list-disc pl-4">
                      {order.items.map((item) => (
                        <li key={item.id}>
                          {item.product?.name || "Product"} x {item.quantity}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    ${order.total_amount?.toFixed(2) || "0.00"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-50 text-blue-700">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {order.created_at
                      ? new Date(order.created_at).toLocaleString()
                      : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
