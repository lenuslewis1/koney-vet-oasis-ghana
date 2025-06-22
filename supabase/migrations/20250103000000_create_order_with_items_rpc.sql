-- 1. Create a composite type for the order items
CREATE TYPE public.order_item_type AS (
    product_id UUID,
    product_name TEXT,
    product_image_url TEXT,
    quantity INT,
    price_at_purchase NUMERIC
);

-- 2. Create the function to handle order and item creation atomically
CREATE OR REPLACE FUNCTION public.create_order_with_items(
    customer_name TEXT,
    customer_email TEXT,
    customer_phone TEXT,
    shipping_address TEXT,
    total_amount NUMERIC,
    payment_intent_id TEXT,
    items public.order_item_type[]
)
RETURNS UUID
LANGUAGE plpgsql
-- SECURITY DEFINER runs the function with the permissions of the user who created it,
-- bypassing RLS policies for the tables inside, which is necessary for this to work.
SECURITY DEFINER
AS $$
DECLARE
    new_order_id UUID;
BEGIN
    -- Insert the order and return the new ID
    INSERT INTO public.orders (
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        total_amount,
        status,
        payment_intent_id
    )
    VALUES (
        customer_name,
        customer_email,
        customer_phone,
        shipping_address,
        total_amount,
        'pending',
        payment_intent_id
    )
    RETURNING id INTO new_order_id;

    -- Insert the order items
    IF array_length(items, 1) > 0 THEN
        FOR i IN 1..array_length(items, 1) LOOP
            INSERT INTO public.order_items (
                order_id,
                product_id,
                product_name,
                product_image_url,
                quantity,
                price_at_purchase
            )
            VALUES (
                new_order_id,
                (items[i]).product_id,
                (items[i]).product_name,
                (items[i]).product_image_url,
                (items[i]).quantity,
                (items[i]).price_at_purchase
            );
        END LOOP;
    END IF;

    -- Return the ID of the newly created order
    RETURN new_order_id;
END;
$$;

-- 3. Grant permission for 'anon' and 'authenticated' roles to execute the function
GRANT EXECUTE ON FUNCTION public.create_order_with_items(TEXT, TEXT, TEXT, TEXT, NUMERIC, TEXT, public.order_item_type[]) TO anon, authenticated; 