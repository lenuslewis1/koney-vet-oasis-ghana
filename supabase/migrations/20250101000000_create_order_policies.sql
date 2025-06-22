-- Enable RLS on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous users to insert orders
CREATE POLICY "Allow anonymous order insertion" ON orders
FOR INSERT WITH CHECK (true);

-- Policy to allow users to read their own orders (when authenticated)
CREATE POLICY "Allow users to read own orders" ON orders
FOR SELECT USING (
  auth.uid() = user_id OR 
  user_id IS NULL -- Allow reading orders without user_id (anonymous orders)
);

-- Policy to allow admin to read all orders
CREATE POLICY "Allow admin to read all orders" ON orders
FOR SELECT USING (
  auth.jwt() ->> 'email' = 'koneysvethospital@gmail.com'
);

-- Policy to allow admin to update all orders
CREATE POLICY "Allow admin to update all orders" ON orders
FOR UPDATE USING (
  auth.jwt() ->> 'email' = 'koneysvethospital@gmail.com'
);

-- Enable RLS on order_items table
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policy to allow anonymous users to insert order items
CREATE POLICY "Allow anonymous order items insertion" ON order_items
FOR INSERT WITH CHECK (true);

-- Policy to allow users to read their own order items
CREATE POLICY "Allow users to read own order items" ON order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id 
    AND (orders.user_id = auth.uid() OR orders.user_id IS NULL)
  )
);

-- Policy to allow admin to read all order items
CREATE POLICY "Allow admin to read all order items" ON order_items
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM orders 
    WHERE orders.id = order_items.order_id
  )
); 