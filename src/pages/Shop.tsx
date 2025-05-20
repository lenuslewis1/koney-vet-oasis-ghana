
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'food', name: 'Pet Food' },
  { id: 'toys', name: 'Toys' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'grooming', name: 'Grooming Products' },
  { id: 'health', name: 'Health & Wellness' },
];

const products = [
  {
    id: 1,
    name: 'Premium Dog Food',
    category: 'food',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Cat Scratch Tower',
    category: 'accessories',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1585071550721-fdb362ae2b8d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Plush Dog Toy Set',
    category: 'toys',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Pet Grooming Brush',
    category: 'grooming',
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1599012307905-23c3ca27d7c9?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 5,
    name: 'Cat Food - Seafood Blend',
    category: 'food',
    price: 45.75,
    image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 6,
    name: 'Dog Collar - Premium Leather',
    category: 'accessories',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1599390756029-56dd8a6609f4?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 7,
    name: 'Interactive Cat Toy',
    category: 'toys',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1615789591457-74a63395c990?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 8,
    name: 'Flea & Tick Treatment',
    category: 'health',
    price: 55.25,
    image: 'https://images.unsplash.com/photo-1618946456726-83652a3751f4?auto=format&fit=crop&w=600&q=80',
  },
];

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <MainLayout>
      <PageHeader
        title="Pet Shop"
        description="Quality products for your furry friends"
        bgImage="https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?auto=format&fit=crop&w=2000&q=80"
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-vet-dark mb-4">Categories</h3>
                
                <RadioGroup 
                  value={selectedCategory} 
                  onValueChange={setSelectedCategory}
                  className="space-y-2"
                >
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={category.id} id={category.id} />
                      <Label htmlFor={category.id} className="cursor-pointer">
                        {category.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
                
                <div className="mt-8">
                  <h3 className="text-xl font-semibold text-vet-dark mb-4">Search</h3>
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
                {selectedCategory === 'all' ? 'All Products' : 
                  categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              
              {filteredProducts.length === 0 ? (
                <div className="bg-vet-light rounded-lg p-8 text-center">
                  <p className="text-gray-600">No products found. Try a different search or category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-custom"
                    >
                      <div className="relative h-48">
                        <img 
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <span className="text-sm text-vet-teal font-medium">
                          {categories.find(c => c.id === product.category)?.name.replace('Pet ', '')}
                        </span>
                        <h3 className="text-vet-dark font-medium text-lg mt-1 hover:text-vet-blue transition-custom">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-semibold text-vet-dark">GH₵{product.price.toFixed(2)}</span>
                          <Button size="sm" className="bg-vet-blue hover:bg-vet-teal h-9 w-9 p-0">
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
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
