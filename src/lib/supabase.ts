import { createClient } from '@supabase/supabase-js';

// These would typically be stored in environment variables
// For development purposes, they're included directly here
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type definitions for orders
export type OrderItem = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
};

export type Order = {
  id?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt?: string;
  notes?: string;
  address?: string;
};

// Function to save an order to Supabase
export const saveOrder = async (order: Omit<Order, 'id' | 'createdAt'>) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          ...order,
          createdAt: new Date().toISOString(),
        },
      ])
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error saving order:', error);
    return { data: null, error };
  }
};

// Function to get all orders
export const getOrders = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching orders:', error);
    return { data: null, error };
  }
};

// Function to get a single order by ID
export const getOrderById = async (id: string) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching order:', error);
    return { data: null, error };
  }
};

// Function to update order status
export const updateOrderStatus = async (id: string, status: Order['status']) => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id)
      .select();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating order status:', error);
    return { data: null, error };
  }
};
