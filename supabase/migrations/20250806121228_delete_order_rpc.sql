-- supabase/migrations/YYYYMMDDHHMMSS_delete_order_rpc.sql

-- Drop the function if it already exists to ensure a clean setup
DROP FUNCTION IF EXISTS delete_order(uuid);

-- Create the delete_order function
CREATE OR REPLACE FUNCTION delete_order(order_id_to_delete uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- First, delete the associated order items
  DELETE FROM public.order_items
  WHERE order_id = order_id_to_delete;

  -- Then, delete the order itself
  DELETE FROM public.orders
  WHERE id = order_id_to_delete;
END;
$$;
