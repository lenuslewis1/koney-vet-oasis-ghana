import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/layout/PageTransition";
import { motion } from "framer-motion";

type Order = Tables<"orders">;
type OrderItem = Tables<"order_items">;
type Product = Tables<"products">;

interface OrderWithItems extends Order {
  items: (OrderItem & { product?: Product })[];
}

const Orders = () => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);

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

  // Helper to group orders by day
  function groupOrdersByDay(orders: OrderWithItems[]) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const groups: Record<string, OrderWithItems[]> = {
      Today: [],
      Yesterday: [],
      Earlier: [],
    };
    orders.forEach((order) => {
      const created = new Date(order.created_at);
      if (
        created.getDate() === today.getDate() &&
        created.getMonth() === today.getMonth() &&
        created.getFullYear() === today.getFullYear()
      ) {
        groups.Today.push(order);
      } else if (
        created.getDate() === yesterday.getDate() &&
        created.getMonth() === yesterday.getMonth() &&
        created.getFullYear() === yesterday.getFullYear()
      ) {
        groups.Yesterday.push(order);
      } else {
        groups.Earlier.push(order);
      }
    });
    return groups;
  }

  // Helper to get color class for status
  function getStatusColor(status: string) {
    switch (status) {
      case "pending":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "processing":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  }

  // Function to update order status
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const { error } = await supabase
        .from("orders")
        .update({ status: newStatus })
        .eq("id", orderId);
      if (error) throw error;
      toast.success("Order status updated!");
      await fetchOrders();
    } catch (err: any) {
      setError(err?.message || "Failed to update order status");
      toast.error("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  // Function to open delete modal
  const openDeleteModal = (orderId: string) => {
    setOrderToDelete(orderId);
    setShowDeleteModal(true);
  };

  // Function to close delete modal
  const closeDeleteModal = () => {
    setOrderToDelete(null);
    setShowDeleteModal(false);
  };

  // Function to delete an order
  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    setUpdatingId(orderToDelete);
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderToDelete);
      if (error) throw error;
      toast.success("Order deleted!");
      await fetchOrders();
      closeDeleteModal();
    } catch (err: any) {
      setError(err?.message || "Failed to delete order");
      toast.error("Failed to delete order");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[url('/admin-bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed space-y-6">
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
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(groupOrdersByDay(orders)).map(
                  ([group, groupOrders]) => (
                    <>
                      <tr>
                        <td
                          colSpan={6}
                          className="bg-gray-100 font-bold px-6 py-2"
                        >
                          {group}
                        </td>
                      </tr>
                      {groupOrders.map((order) => (
                        <motion.tr
                          key={order.id}
                          className="hover:bg-gray-50"
                          whileHover={{
                            scale: 1.01,
                            boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <div className="font-medium text-gray-900">
                              {order.customer_name}
                            </div>
                            <div className="text-gray-500">
                              {order.customer_email}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <ul className="list-disc pl-4">
                              {order.items.map((item) => (
                                <li key={item.id}>
                                  {item.product?.name || "Product"} x{" "}
                                  {item.quantity}
                                </li>
                              ))}
                            </ul>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                            ${order.total_amount?.toFixed(2) || "0.00"}
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <select
                              value={order.status}
                              onChange={(e) =>
                                handleStatusChange(order.id, e.target.value)
                              }
                              disabled={updatingId === order.id}
                              className={`border rounded px-2 py-1 ${getStatusColor(
                                order.status
                              )}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            {updatingId === order.id && (
                              <span className="ml-2 text-xs text-blue-500">
                                Updating...
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {order.created_at
                              ? new Date(order.created_at).toLocaleString()
                              : ""}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => openDeleteModal(order.id)}
                              className="text-red-600 hover:text-red-900 disabled:opacity-50"
                              disabled={updatingId === order.id}
                              title="Delete order"
                            >
                              <Trash2 size={18} />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
              <h2 className="text-lg font-semibold mb-4">Delete Order</h2>
              <p className="mb-6">
                Are you sure you want to delete this order?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
                  disabled={updatingId === orderToDelete}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteOrder}
                  className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                  disabled={updatingId === orderToDelete}
                >
                  {updatingId === orderToDelete ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Orders;
