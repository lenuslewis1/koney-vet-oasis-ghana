// Import the supabase client from the centralized location
import { supabase } from "@/integrations/supabase/client";

// Type definitions for orders
export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  product_image_url?: string;
};

export type Order = {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt?: string;
  notes?: string;
  address?: string;
};

// Function to check if the orders table exists and get its structure
export const checkOrdersTable = async () => {
  try {
    // First, check if we can access the table at all
    const { data, error } = await supabase.from("orders").select("*").limit(1);

    if (error) {
      console.error("Error accessing orders table:", error);
      return { exists: false, error };
    }

    console.log("Orders table exists and is accessible");
    return { exists: true, error: null };
  } catch (error) {
    console.error("Error checking orders table:", error);
    return { exists: false, error };
  }
};

// Function to save an order to Supabase, matching the exact database schema
// Type definition for contact messages
export type ContactMessage = {
  id?: number;
  name: string;
  email: string;
  phone_number: number;
  message: string;
};

// Type for contact message input data
export type ContactMessageInput = {
  name: string;
  email: string;
  phone?: string; // Optional string for phone input
  message: string;
};

/**
 * Save a contact form message to Supabase
 */
export const saveContactMessage = async (messageData: ContactMessageInput) => {
  try {
    console.log("Saving contact message to Supabase");

    // Create a contact message object that matches the database schema
    // Convert phone to numeric as required by the schema
    const phoneNumber = messageData.phone
      ? parseFloat(messageData.phone.replace(/[^0-9]/g, ""))
      : 0;

    const contactData = {
      name: messageData.name.trim(),
      email: messageData.email.trim(),
      phone_number: phoneNumber,
      message: messageData.message.trim(),
    };

    console.log("Sending contact data:", contactData);

    // Insert the contact message
    const result = await supabase.from("contact_messages").insert(contactData);

    if (result.error) {
      console.error(
        "Failed to save contact message. Database error:",
        result.error
      );
      return { data: null, error: result.error };
    }

    console.log("Contact message saved successfully");

    // We'll handle notifications separately to avoid client-side Nodemailer issues
    console.log(
      "Contact message saved - notifications will be handled separately"
    );

    return { data: { success: true }, error: null };
  } catch (error) {
    console.error("Error in saveContactMessage function:", error);
    return { data: null, error };
  }
};

export const saveOrder = async (order: Omit<Order, "id" | "createdAt">) => {
  try {
    console.log("Saving order via RPC");

    const orderItemsForRpc = order.items.map((item) => ({
      product_id: item.productId || "00000000-0000-0000-0000-000000000000", // Use a fallback UUID if null
      product_name: item.productName || "Unknown Product",
      product_image_url: item.product_image_url || "",
      quantity: item.quantity,
      price_at_purchase: Number(item.price.toFixed(2)),
    }));

    const { data, error } = await supabase.rpc("create_order_with_items", {
      customer_name: order.customerName.trim(),
      customer_email: order.customerEmail.trim(),
      customer_phone: order.customerPhone.trim() || null,
      shipping_address: order.address?.trim() || "",
      total_amount: Number(order.totalAmount.toFixed(2)),
      payment_intent_id: order.notes || null,
      items: orderItemsForRpc,
    });

    if (error) {
      console.error("Failed to save order via RPC. Database error:", error);
      return { data: null, error };
    }

    console.log("Order saved successfully via RPC with ID:", data);
    return { data: { success: true, orderId: data }, error: null };
  } catch (error) {
    console.error("Error in saveOrder function:", error);
    return { data: null, error };
  }
};

// Function to get all orders
export const getOrders = async () => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("createdAt", { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { data: null, error };
  }
};

// Function to get a single order by ID
export const getOrderById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error fetching order:", error);
    return { data: null, error };
  }
};

// Function to update order status
export const updateOrderStatus = async (
  id: string,
  status: Order["status"]
) => {
  try {
    const { data, error } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", id)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { data: null, error };
  }
};
