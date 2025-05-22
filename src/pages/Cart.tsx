import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/shop">
              <Button className="bg-vet-blue hover:bg-vet-teal">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <ul className="divide-y">
              {cart.map(item => (
                <li key={item.id} className="flex items-center py-4 gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">₵{item.price.toFixed(2)}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>-</Button>
                      <span>{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                      <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>Remove</Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center mt-6">
              <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
              <div className="text-lg font-bold">Total: ₵{total.toFixed(2)}</div>
              <Button className="bg-vet-blue hover:bg-vet-teal" onClick={() => navigate('/shop/checkout')}>Proceed to Checkout</Button>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Cart;
