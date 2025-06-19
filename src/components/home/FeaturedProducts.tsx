import * as React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const FeaturedProducts = () => {
  const { addToCart } = useCart();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .limit(4);

      if (error) {
        toast.error("Failed to load featured products");
        throw error;
      }

      return data || [];
    },
  });

  return (
    <section className="py-16">
      <div className="container-custom">
        <SectionHeading
          title="Featured Pet Products"
          subtitle="Shop Our Collection"
          centered={true}
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vet-blue"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-custom"
              >
                <Link to={`/shop/product/${product.id}`}>
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <span className="text-sm text-vet-teal font-medium">
                    {product.category}
                  </span>
                  <Link to={`/shop/product/${product.id}`}>
                    <h3 className="text-vet-dark font-medium text-lg mt-1 hover:text-vet-blue transition-custom">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-semibold text-vet-dark">
                      GH₵{product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      className="bg-vet-blue hover:bg-vet-teal h-9 w-9 p-0"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image_url,
                          quantity: 1,
                        });
                        toast.success(`Added ${product.name} to cart`);
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/shop">
            <Button className="bg-vet-blue hover:bg-vet-teal">
              Browse All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
