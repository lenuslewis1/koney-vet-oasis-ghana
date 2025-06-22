-- Create a policy to allow public read access to the products table.
-- This is necessary for the admin orders page to join and display product details.
CREATE POLICY "Allow public read access to products"
ON public.products
FOR SELECT
USING (true); 