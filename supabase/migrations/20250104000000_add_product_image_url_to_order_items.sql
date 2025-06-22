-- Add the missing product_image_url column to the order_items table
ALTER TABLE public.order_items
ADD COLUMN product_image_url TEXT; 