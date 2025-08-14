-- Add admin delete policy for order_items
CREATE POLICY "Allow admin to delete all order_items" ON public.order_items 
FOR DELETE TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM auth.users 
    WHERE auth.uid() = id 
    AND email = 'koneysvethospital@gmail.com'
  )
);
