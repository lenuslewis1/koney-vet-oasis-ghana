import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('later');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
  
  const hospitalPhone = '053 373 4385';
  const momoName = "Koney's Veterinary Hospital";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the order to your backend
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <MainLayout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
          <p className="mb-6">We have received your order and will contact you soon.</p>
          <Link to="/shop">
            <Button className="bg-vet-blue hover:bg-vet-teal">Back to Shop</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-custom py-12 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input type="email" className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input type="tel" className="w-full border rounded px-3 py-2" value={phone} onChange={e => setPhone(e.target.value)} required />
          </div>
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input className="w-full border rounded px-3 py-2" value={address} onChange={e => setAddress(e.target.value)} required />
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="later" id="pay-later" />
                <Label htmlFor="pay-later">Pay Later (on delivery)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="now" id="pay-now" />
                <Label htmlFor="pay-now">Pay Now (MoMo)</Label>
              </div>
            </RadioGroup>
          </div>
          
          {paymentMethod === 'now' && (
            <div className="bg-vet-light p-4 rounded-md mt-2">
              <h4 className="font-medium text-vet-blue mb-2">MoMo Payment Details</h4>
              <p className="mb-1">Please send payment to:</p>
              <p className="font-medium">{momoName}</p>
              <p className="font-medium">{hospitalPhone}</p>
              <p className="text-sm mt-2 text-gray-600">Please include your name in the payment reference</p>
            </div>
          )}
          
          <div className="font-bold text-lg mt-4">Order Total: ₵{total.toFixed(2)}</div>
          <Button className="bg-vet-blue hover:bg-vet-teal w-full mt-2" type="submit">Place Order</Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Checkout;
