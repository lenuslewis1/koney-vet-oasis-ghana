import { useState, useEffect } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Filter,
  ChevronDown,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import ProductForm from "@/components/admin/ProductForm";
import PageTransition from "@/components/layout/PageTransition";
import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type Product = Tables<"products">;

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id: string) => {
    try {
      // 1. Find all order_items with this product_id
      const { data: orderItems, error: fetchOrderItemsError } = await supabase
        .from("order_items")
        .select("id, order_id")
        .eq("product_id", id);
      if (fetchOrderItemsError) {
        setError(`Error fetching order items: ${fetchOrderItemsError.message}`);
        console.error("Error fetching order items:", fetchOrderItemsError);
        return;
      }
      const orderIds = [
        ...new Set((orderItems || []).map((item) => item.order_id)),
      ];
      if (orderIds.length > 0) {
        // 2. Fetch the status of all related orders
        const { data: orders, error: fetchOrdersError } = await supabase
          .from("orders")
          .select("id, status")
          .in("id", orderIds);
        if (fetchOrdersError) {
          setError(
            `Error fetching related orders: ${fetchOrdersError.message}`
          );
          console.error("Error fetching related orders:", fetchOrdersError);
          return;
        }
        // 3. Check if any order is not completed
        const hasNonCompleted = (orders || []).some(
          (order) => order.status !== "completed"
        );
        if (hasNonCompleted) {
          setError(
            "This product is referenced in an order that is not completed. Please complete the order(s) before deleting this product."
          );
          return;
        }
      }
      // 4. Delete all order_items for these orders (all completed)
      if (orderIds.length > 0) {
        const { error: deleteOrderItemsError } = await supabase
          .from("order_items")
          .delete()
          .in("order_id", orderIds);
        if (deleteOrderItemsError) {
          setError(
            `Error deleting order items: ${deleteOrderItemsError.message}`
          );
          console.error("Error deleting order items:", deleteOrderItemsError);
          return;
        }
      }
      // 5. Delete all orders with these IDs (all completed)
      if (orderIds.length > 0) {
        const { error: deleteOrdersError } = await supabase
          .from("orders")
          .delete()
          .in("id", orderIds);
        if (deleteOrdersError) {
          setError(`Error deleting orders: ${deleteOrdersError.message}`);
          console.error("Error deleting orders:", deleteOrdersError);
          return;
        }
      }
      // 6. Delete any remaining order_items for this product (in case there are any not linked to an order)
      const { error: orderItemsError } = await supabase
        .from("order_items")
        .delete()
        .eq("product_id", id);
      if (orderItemsError) {
        setError(`Error deleting order items: ${orderItemsError.message}`);
        console.error("Error deleting order items:", orderItemsError);
        return;
      }
      // 7. Delete the product
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        setError(`Error deleting product: ${error.message}`);
        console.error("Error deleting product:", error);
        return;
      }
      await fetchProducts(); // Refresh the list
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete product");
      console.error("Unexpected error deleting product:", err);
    }
  };

  // Handle edit product
  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Handle add new product
  const handleAdd = () => {
    setSelectedProduct(undefined);
    setIsModalOpen(true);
  };

  // Handle form success
  const handleFormSuccess = () => {
    setIsModalOpen(false);
    fetchProducts();
  };

  // Filter products based on search query
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageTransition>
      <div className="min-h-screen bg-[url('/admin-bg.jpg')] bg-cover bg-center bg-no-repeat bg-fixed space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Products Management
          </h1>
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700"
            onClick={handleAdd}
          >
            <Plus size={20} className="mr-2" />
            Add New Product
          </motion.button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 border rounded-lg flex items-center hover:bg-gray-50">
              <Filter size={20} className="mr-2" />
              Filter
              <ChevronDown size={20} className="ml-2" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading products...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <motion.tr
                      key={product.id}
                      className="hover:bg-gray-50"
                      whileHover={{
                        scale: 1.01,
                        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={product.image_url}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {product.description.substring(0, 50)}...
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.category}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${product.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.stock}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-blue-600 hover:text-blue-900 mr-4"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => setProductToDelete(product)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X size={24} />
                </button>
              </div>
              <ProductForm
                product={selectedProduct}
                onSuccess={handleFormSuccess}
                onCancel={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        <AlertDialog
          open={!!productToDelete}
          onOpenChange={(open) => !open && setProductToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete <b>{productToDelete?.name}</b>?
                This will also remove it from any existing orders and order
                items. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  if (productToDelete) {
                    await handleDelete(productToDelete.id);
                    setProductToDelete(null);
                  }
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageTransition>
  );
};

export default Products;
