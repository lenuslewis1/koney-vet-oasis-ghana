
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import * as OneSignal from "npm:onesignal-node@3.4.0";

// Create a OneSignal client
const client = new OneSignal.Client(
  Deno.env.get("ONESIGNAL_APP_ID") || "",
  Deno.env.get("ONESIGNAL_API_KEY") || ""
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();
    
    // Extract order information
    const { id, customer_name, total_amount } = record;
    
    // Create notification content
    const notification = {
      contents: {
        en: `New order #${id.substring(0, 8)} from ${customer_name} for GH₵${total_amount.toFixed(2)}`,
      },
      headings: {
        en: "New Pet Shop Order!",
      },
      included_segments: ["All"], // Send to all subscribed devices
      data: {
        orderId: id,
        amount: total_amount,
      },
    };

    // Send the notification
    console.log("Sending notification:", notification);
    const response = await client.createNotification(notification);
    console.log("Notification sent successfully:", response.body);

    return new Response(
      JSON.stringify({ success: true, message: "Notification sent successfully" }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error sending notification:", error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { "Content-Type": "application/json", ...corsHeaders },
        status: 500,
      }
    );
  }
});
