-- Fixed delete_order function that works with string IDs
DROP FUNCTION IF EXISTS public.delete_order(text);

-- Create the delete_order function
CREATE OR REPLACE FUNCTION public.delete_order(order_id_to_delete text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  admin_email text := 'koneysvethospital@gmail.com';
BEGIN
  -- Security check: Only allow if admin or if deleting own order
  IF NOT (
    (SELECT email FROM auth.users WHERE id = auth.uid()) = admin_email
  ) THEN
    RAISE EXCEPTION 'Permission denied: Only administrators can delete orders';
  END IF;

  -- First, delete the associated order items
  DELETE FROM public.order_items
  WHERE order_id = order_id_to_delete;

  -- Then, delete the order itself
  DELETE FROM public.orders
  WHERE id = order_id_to_delete;
END;
$$;

-- Grant execution permission to authenticated users
GRANT EXECUTE ON FUNCTION public.delete_order(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_order(text) TO anon;
