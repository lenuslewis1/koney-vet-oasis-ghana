
-- Create a function that will be called when a new order is inserted
CREATE OR REPLACE FUNCTION notify_on_order_insert()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function to send the notification
  PERFORM
    net.http_post(
      url:='https://hplmldtcdyrcvkynqlul.supabase.co/functions/v1/order-notification',
      headers:=jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || CURRENT_SETTING('extensions.onesignal.api_key')
      ),
      body:=jsonb_build_object(
        'record', to_jsonb(NEW)
      )
    );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on the orders table
DROP TRIGGER IF EXISTS order_insert_trigger ON public.orders;
CREATE TRIGGER order_insert_trigger
AFTER INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION notify_on_order_insert();
