-- Drop the old policies if they exist
DROP POLICY IF EXISTS "Allow admin to read all orders" ON public.orders;
DROP POLICY IF EXISTS "Allow admin to read all order items" ON public.order_items;

-- Create a new security definer function to check for admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN (auth.jwt() ->> 'email') = 'koneysvethospital@gmail.com';
END;
$$;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

-- New policy for admins to select all orders
CREATE POLICY "Allow admins to read all orders"
ON public.orders
FOR SELECT
TO authenticated
USING (is_admin());

-- New policy for admins to select all order items
CREATE POLICY "Allow admins to read all order items"
ON public.order_items
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id AND is_admin()
  )
); 