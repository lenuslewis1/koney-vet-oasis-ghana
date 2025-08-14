import emailjs from '@emailjs/browser';

// EmailJS configuration with environment variables
// Note: You need to add your EmailJS credentials to .env file
// Get them from: https://dashboard.emailjs.com/admin/account
const EMAILJS_CONFIG = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_uehk5ke',
  adminTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_oqhdtrr',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key_here',
  adminEmail: 'koneysvethospital@gmail.com'
};

// Initialize EmailJS with validation
export const initEmailJS = () => {
  const publicKey = EMAILJS_CONFIG.publicKey;
  
  // Add more detailed debugging
  console.log('EmailJS initialization - Public Key:', publicKey);
  console.log('Environment variable value:', import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  
  if (!publicKey || publicKey === 'your_public_key_here') {
    console.error('❌ EmailJS Public Key is not configured properly!');
    console.error('Please add VITE_EMAILJS_PUBLIC_KEY to your .env file');
    console.error('Get your key from: https://dashboard.emailjs.com/admin/account');
    return false;
  }
  
  try {
    emailjs.init(publicKey);
    console.log('✅ EmailJS initialized successfully with key:', publicKey);
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize EmailJS:', error);
    return false;
  }
};

// Order interface for email notifications
export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  shippingAddress?: string;
  totalAmount: number;
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
  }>;
  createdAt: string;
}

// Customer email functionality removed - only admin email implemented

// Send order notification email to admin
export const sendOrderNotificationEmail = async (orderData: OrderEmailData): Promise<boolean> => {
  // Check if EmailJS is properly configured
  if (!EMAILJS_CONFIG.publicKey || EMAILJS_CONFIG.publicKey === 'your_public_key_here') {
    console.error('❌ EmailJS not configured. Please add VITE_EMAILJS_PUBLIC_KEY to your .env file');
    return false;
  }
  
  try {
    const templateParams = {
      to_email: EMAILJS_CONFIG.adminEmail,
      to_name: 'Koney Veterinary Hospital Admin',
      order_id: orderData.orderId,
      customer_name: orderData.customerName,
      customer_email: orderData.customerEmail,
      customer_phone: orderData.customerPhone || 'Not provided',
      shipping_address: orderData.shippingAddress || 'Not provided',
      total_amount: orderData.totalAmount.toFixed(2),
      order_date: new Date(orderData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items_list: orderData.items.map(item => 
        `${item.productName} (Qty: ${item.quantity}) - GH₵${item.price.toFixed(2)}`
      ).join('\n'),
      items_count: orderData.items.length,
      admin_dashboard_url: `${window.location.origin}/admin/orders`
    };

    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.adminTemplateId,
      templateParams
    );

    console.log('Admin order notification email sent successfully:', result);
    return true;
  } catch (error) {
    console.error('Failed to send admin order notification email:', error);
    return false;
  }
};

// Send only admin notification email
export const sendOrderEmails = async (orderData: OrderEmailData): Promise<{ adminEmail: boolean }> => {
  console.log('Sending admin notification email for order:', orderData.orderId);
  
  const adminEmailResult = await sendOrderNotificationEmail(orderData);

  return {
    adminEmail: adminEmailResult
  };
};

// Email template suggestions for EmailJS dashboard
export const EMAIL_TEMPLATES = {
  customerOrderConfirmation: {
    subject: 'Order Confirmation - {{order_id}} | {{company_name}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">{{company_name}}</h1>
            <p style="color: #666; margin: 5px 0;">Professional Veterinary Care</p>
          </div>
          
          <h2 style="color: #1f2937;">Order Confirmation</h2>
          <p>Dear {{customer_name}},</p>
          <p>Thank you for your order! We've received your order and it's being processed.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Order Details</h3>
            <p><strong>Order ID:</strong> {{order_id}}</p>
            <p><strong>Order Date:</strong> {{order_date}}</p>
            <p><strong>Total Amount:</strong> GH₵{{total_amount}}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Items Ordered</h3>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">{{items_list}}</pre>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Shipping Information</h3>
            <p><strong>Name:</strong> {{customer_name}}</p>
            <p><strong>Email:</strong> {{customer_email}}</p>
            <p><strong>Phone:</strong> {{customer_phone}}</p>
            <p><strong>Address:</strong> {{shipping_address}}</p>
          </div>
          
          <p>We'll notify you when your order ships. If you have any questions, please contact us at {{company_email}}.</p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #666;">Thank you for choosing {{company_name}}!</p>
            <p style="color: #666;">Visit us at <a href="{{website_url}}" style="color: #2563eb;">{{website_url}}</a></p>
          </div>
        </div>
      </div>
    `
  },
  
  adminOrderNotification: {
    subject: 'New Order Received - {{order_id}}',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #dc2626;">🚨 New Order Alert</h2>
          <p>A new order has been placed on your website.</p>
          
          <div style="background-color: #fef2f2; border-left: 4px solid #dc2626; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Order Information</h3>
            <p><strong>Order ID:</strong> {{order_id}}</p>
            <p><strong>Order Date:</strong> {{order_date}}</p>
            <p><strong>Total Amount:</strong> GH₵{{total_amount}}</p>
            <p><strong>Items Count:</strong> {{items_count}} items</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Customer Details</h3>
            <p><strong>Name:</strong> {{customer_name}}</p>
            <p><strong>Email:</strong> {{customer_email}}</p>
            <p><strong>Phone:</strong> {{customer_phone}}</p>
            <p><strong>Address:</strong> {{shipping_address}}</p>
          </div>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1f2937;">Items Ordered</h3>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">{{items_list}}</pre>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="{{admin_dashboard_url}}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              View in Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    `
  }
};
