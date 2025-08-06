import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { saveOrder, checkOrdersTable, Order } from "@/lib/supabase";
import MainLayout from "@/components/layout/MainLayout";
import { toast } from "sonner";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("later");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const hospitalPhone = "053 373 4385";
  const momoName = "Koney's Veterinary Hospital";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!name.trim() || !email.trim() || !phone.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsSubmitting(true);
      console.log("Starting checkout process...");

      // First, check if the orders table exists and is accessible
      console.log("Checking orders table...");
      const tableCheck = await checkOrdersTable();

      if (!tableCheck.exists) {
        console.error(
          "Orders table does not exist or is not accessible:",
          tableCheck.error
        );
        toast.error(
          "Cannot connect to the order system. Please try again later or contact support."
        );
        setIsSubmitting(false);
        return;
      }

      console.log("Orders table is accessible, proceeding with order...");

      // Convert cart items to order items format
      const orderItems = cart.map((item) => ({
        productId: item.id || "",
        productName: item.name || "Unknown Product",
        quantity: item.quantity || 1,
        price: item.price || 0,
        product_image_url: item.image || "", // Add image URL to order items
      }));

      console.log("Prepared order items:", orderItems);

      const orderData = {
        customerName: name.trim(),
        customerEmail: email.trim(),
        customerPhone: phone.trim(),
        address: address.trim(),
        items: orderItems,
        totalAmount: total,
        status: "pending" as Order["status"], // Explicitly type as Order['status']
        notes: paymentMethod === "now" ? "Paid via MoMo" : "Pay on delivery",
      };

      console.log("Submitting order...");

      // Call saveOrder with better error handling
      try {
        const { data, error } = await saveOrder(orderData);

        if (error) {
          console.error("Error saving order:", error);
          toast.error(
            `Failed to place order: ${error.message || "Database error"}`
          );
          setIsSubmitting(false);
          return; // Exit early on error
        }

        console.log("Order saved successfully");
        clearCart();
        setSubmitted(true);
        toast.success("Order placed successfully!", {
          duration: 5000,
          description: "We've received your order and will contact you soon."
        });
      } catch (saveError) {
        console.error("Exception during order save:", saveError);
        toast.error("An unexpected error occurred while saving your order");
        setIsSubmitting(false);
        return;
      }
    } catch (error) {
      console.error("Error placing order:", error);
      // Show more specific error message if possible
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      toast.error(`Failed to place order: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <MainLayout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
          <p className="mb-6">
            We have received your order and will contact you soon.
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
      <div className="container-custom py-12 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-6">Checkout</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number</label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mt-6">
            <h3 className="font-medium mb-2">Payment Method</h3>
            <RadioGroup
              value={paymentMethod}
              onValueChange={setPaymentMethod}
              className="space-y-2"
            >
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

          {paymentMethod === "now" && (
            <div className="bg-vet-light p-4 rounded-md mt-2">
              <h4 className="font-medium text-vet-blue mb-2">
                MoMo Payment Details
              </h4>
              <p className="mb-1">Please send payment to:</p>
              <p className="font-medium">{momoName}</p>
              <p className="font-medium">{hospitalPhone}</p>
              <p className="text-sm mt-2 text-gray-600">
                Please include your name in the payment reference
              </p>
            </div>
          )}

          <div className="font-bold text-lg mt-4">
            Order Total: ₵{total.toFixed(2)}
          </div>
          <Button
            className="bg-vet-blue hover:bg-vet-teal w-full mt-2"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </Button>
        </form>
      </div>
    </MainLayout>
  );
};

export default Checkout;
