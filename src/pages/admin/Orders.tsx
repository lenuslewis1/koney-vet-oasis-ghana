import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { 
  Loader2, 
  Trash2, 
  Package, 
  Calendar, 
  DollarSign, 
  Hash, 
  Grid3X3, 
  List,
  User,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { toast } from "sonner";
import PageTransition from "@/components/layout/PageTransition";
import { motion, AnimatePresence } from "framer-motion";

type Order = Tables<"orders">;
type OrderItem = Tables<"order_items">;
type Product = Tables<"products">;

interface OrderWithItems extends Order {
  items: (OrderItem & { product?: Product })[];
}

type ViewMode = 'grid' | 'list';

const Orders = () => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    // Get saved view preference from sessionStorage
    const saved = sessionStorage.getItem('ordersViewMode');
    return (saved as ViewMode) || 'grid';
  });

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle view mode change
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    sessionStorage.setItem('ordersViewMode', mode);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Grid View Component
  const GridView = () => (
    <motion.div 
      key="grid"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {orders.map((order) => (
        <motion.div
          key={order.id}
          className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200"
          whileHover={{ y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Order Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-mono text-gray-600">
                  {order.id.substring(0, 8)}
                </span>
              </div>
              <button
                onClick={() => openDeleteModal(order.id)}
                className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors"
                disabled={updatingId === order.id}
                title="Delete order"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {formatDate(order.created_at)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                disabled={updatingId === order.id}
                className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(order.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              
              {updatingId === order.id && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              )}
            </div>
          </div>

          {/* Customer Info */}
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-1">{order.customer_name}</h3>
            <p className="text-sm text-gray-600 mb-1">{order.customer_email}</p>
            {order.customer_phone && (
              <p className="text-sm text-gray-600">{order.customer_phone}</p>
            )}
            {order.shipping_address && (
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">{order.shipping_address}</p>
            )}
          </div>

          {/* Order Items */}
          <div className="px-6 py-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Package className="h-4 w-4" />
              Items ({order.items.length})
            </h4>
            
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {item.product?.image_url ? (
                      <img
                        src={item.product.image_url}
                        alt={item.product.name || "Product"}
                        className="w-16 h-16 object-cover rounded-md border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center">
                        <Package className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-gray-900 truncate">
                      {item.product?.name || item.product_name || "Unknown Product"}
                    </h5>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        GH₵{item.price_at_purchase?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Total Amount
              </span>
              <span className="text-lg font-bold text-green-600">
                GH₵{order.total_amount?.toFixed(2) || "0.00"}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  // List View Component
  const ListView = () => (
    <motion.div 
      key="list"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <motion.tr
                key={order.id}
                className="hover:bg-gray-50 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {/* Order Details */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Hash className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        #{order.id.substring(0, 8)}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(order.created_at)}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Customer */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer_name}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {order.customer_email}
                      </div>
                      {order.customer_phone && (
                        <div className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {order.customer_phone}
                        </div>
                      )}
                    </div>
                  </div>
                </td>

                {/* Items */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-900">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="mt-1 flex -space-x-2">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={item.id} className="relative">
                        {item.product?.image_url ? (
                          <img
                            src={item.product.image_url}
                            alt={item.product.name || "Product"}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                            title={item.product.name || "Product"}
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                            <Package className="h-3 w-3 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-8 h-8 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-xs text-gray-600">+{order.items.length - 3}</span>
                      </div>
                    )}
                  </div>
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    disabled={updatingId === order.id}
                    className={`text-xs font-medium px-3 py-1 rounded-full border ${getStatusColor(order.status)} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>

                {/* Total */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-lg font-bold text-green-600">
                      GH₵{order.total_amount?.toFixed(2) || "0.00"}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    {updatingId === order.id && (
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                    )}
                    <button
                      onClick={() => openDeleteModal(order.id)}
                      className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50 transition-colors"
                      disabled={updatingId === order.id}
                      title="Delete order"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 space-y-6">
        <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => handleViewModeChange('grid')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </button>
              <button
                onClick={() => handleViewModeChange('list')}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                title="List View"
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-6">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-sm">
              {error}
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500">Orders will appear here once customers start placing them.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? <GridView /> : <ListView />}
            </AnimatePresence>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md"
            >
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Delete Order</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this order? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  disabled={updatingId === orderToDelete}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteOrder}
                  className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
                  disabled={updatingId === orderToDelete}
                >
                  {updatingId === orderToDelete ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </div>
                  ) : (
                    "Delete Order"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Orders;