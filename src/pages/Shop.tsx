import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const categories = [
  { id: "all", name: "All Products" },
  { id: "food", name: "Pet Food" },
  { id: "toys", name: "Toys" },
  { id: "accessories", name: "Accessories" },
  { id: "grooming", name: "Grooming Products" },
  { id: "health", name: "Health & Wellness" },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { addToCart } = useCart();

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");

      if (error) {
        toast.error("Failed to load products");
        throw error;
      }

      return data || [];
    },
  });

  useEffect(() => {
    if (error) {
      console.error("Error fetching products:", error);
    }
  }, [error]);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Pet Shop"
        description="Quality products for your furry friends"
        bgImage="https://res.cloudinary.com/dzmvzdcpx/image/upload/v1748531489/_MG_2274_b5iwmy.jpg"
      />

      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-vet-dark mb-4">
                  Categories
                </h3>

                <RadioGroup
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  className="space-y-2"
                >
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem value={category.id} id={category.id} />
                      <Label htmlFor={category.id} className="cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-vet-dark mb-4">
                    Search
                  </h3>
                  <div className="relative">
                    <Search className="h-4 w-4 absolute top-3 left-3 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-display font-bold text-vet-dark mb-6">
                {selectedCategory === "all"
                  ? "All Products"
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h2>

              {isLoading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vet-blue"></div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="bg-vet-light rounded-lg p-8 text-center">
                  <p className="text-gray-600">
                    No products found. Try a different search or category.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-custom"
                    >
                      <Link
                        to={`/shop/product/${product.id}`}
                        className="block"
                      >
                        <div className="relative h-48">
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <span className="text-sm text-vet-teal font-medium">
                            {categories.find((c) => c.id === product.category)
                              ?.name || product.category}
                          </span>
                          <h3 className="text-vet-dark font-medium text-lg mt-1 hover:text-vet-blue transition-custom">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between mt-3">
                            <span className="font-semibold text-vet-dark">
                              GH₵{product.price.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </Link>
                      <div className="px-4 pb-4 -mt-2">
                        <Button
                          size="sm"
                          className="bg-vet-blue hover:bg-vet-teal w-full"
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
                          <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Shop;
