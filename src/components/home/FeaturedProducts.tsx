
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';

const products = [
  {
    id: 1,
    name: 'Premium Dog Food',
    category: 'Food',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1582798358481-d199fb7347bb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 2,
    name: 'Cat Scratch Tower',
    category: 'Accessories',
    price: 120.00,
    image: 'https://images.unsplash.com/photo-1585071550721-fdb362ae2b8d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 3,
    name: 'Plush Dog Toy Set',
    category: 'Toys',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 4,
    name: 'Pet Grooming Brush',
    category: 'Grooming',
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1599012307905-23c3ca27d7c9?auto=format&fit=crop&w=600&q=80',
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <SectionHeading
          title="Featured Pet Products"
          subtitle="Shop Our Collection"
          centered={true}
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div 
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-custom"
            >
              <Link to={`/shop/product/${product.id}`}>
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <span className="text-sm text-vet-teal font-medium">{product.category}</span>
                <Link to={`/shop/product/${product.id}`}>
                  <h3 className="text-vet-dark font-medium text-lg mt-1 hover:text-vet-blue transition-custom">
                    {product.name}
                  </h3>
                </Link>
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
