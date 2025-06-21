import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) {
        toast.error("Failed to load product details");
        throw error;
      }

      if (!data) {
        throw new Error("Product not found");
      }

      return data;
    },
  });

  const handleIncrement = () => {
    if (product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        quantity,
      });
      toast.success(`Added ${quantity} ${product.name} to cart`);
    }
  };

  if (error) {
    return (
      <MainLayout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Product</h1>
          <p className="mb-6">
            We couldn't find the product you're looking for.
          </p>
          <Link to="/shop">
            <Button className="bg-vet-blue hover:bg-vet-teal">
              Back to Shop
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <Link
          to="/shop"
          className="inline-flex items-center text-vet-blue hover:text-vet-teal mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Shop
        </Link>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vet-blue"></div>
          </div>
        ) : product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div>
              <span className="text-vet-teal font-medium">
                {product.category}
              </span>
              <h1 className="text-3xl font-display font-bold text-vet-dark mt-2 mb-4">
                {product.name}
              </h1>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="flex items-center mb-6">
                <span className="text-2xl font-semibold text-vet-dark">
                  GH₵{product.price.toFixed(2)}
                </span>
                <span className="ml-4 text-sm bg-green-100 text-green-800 py-1 px-2 rounded">
                  {product.stock > 0
                    ? `${product.stock} in stock`
                    : "Out of stock"}
                </span>
              </div>

              {product.stock > 0 && (
                <>
                  <div className="flex items-center mb-8">
                    <span className="mr-4">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={handleDecrement}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-x border-gray-300">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrement}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                        disabled={quantity >= product.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <Button
                    className="bg-vet-blue hover:bg-vet-teal flex items-center"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-vet-dark">
              Product not found
            </h2>
            <p className="mt-4 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/shop">
              <Button className="bg-vet-blue hover:bg-vet-teal">
                Browse Other Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductDetail;
