-- Add foreign key constraint to order_items table
ALTER TABLE public.order_items
ADD CONSTRAINT order_items_order_id_fkey
FOREIGN KEY (order_id)
REFERENCES public.orders (id)
ON DELETE CASCADE; 