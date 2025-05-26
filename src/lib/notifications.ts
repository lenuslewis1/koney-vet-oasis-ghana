import nodemailer from 'nodemailer';
import twilio from 'twilio';
import { OrderItem } from './supabase';

// Email configuration
// For Gmail, you need to use an 'App Password' not your regular password
// Go to your Google Account > Security > 2-Step Verification > App passwords
const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'koneyvetgh@gmail.com', // Update with your actual email
    pass: process.env.EMAIL_PASSWORD || 'your-app-password' // Replace with your app password
  }
};

// Twilio configuration
// Sign up at twilio.com to get these credentials
const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || 'your-account-sid', // Replace with your Twilio Account SID
  authToken: process.env.TWILIO_AUTH_TOKEN || 'your-auth-token', // Replace with your Twilio Auth Token
  fromNumber: process.env.TWILIO_PHONE_NUMBER || '+1234567890' // Replace with your Twilio phone number
};

// Notification recipient configuration
const notificationConfig = {
  email: process.env.NOTIFICATION_EMAIL || 'koneyvetgh@gmail.com', // Update with your notification email
  phone: process.env.NOTIFICATION_PHONE || '+233XXXXXXXXX' // Update with your Ghana phone number
};

/**
 * Send an email notification about a new order
 */
export const sendOrderEmailNotification = async (orderData: any, items: OrderItem[]) => {
  try {
    // Create email transporter
    const transporter = nodemailer.createTransport(emailConfig);
    
    // Format order items for email
    const itemsList = items.map(item => 
      `${item.productName || 'Product'} - Qty: ${item.quantity} - Price: GH₵${item.price.toFixed(2)}`
    ).join('\n');
    
    // Email content
    const mailOptions = {
      from: emailConfig.auth.user,
      to: notificationConfig.email,
      subject: `New Order from ${orderData.customer_name}`,
      text: `
New order received:

Customer: ${orderData.customer_name}
Email: ${orderData.customer_email}
Phone: ${orderData.customer_phone}
Address: ${orderData.shipping_address}
Total: GH₵${orderData.total_amount.toFixed(2)}

Items:
${itemsList}

Notes: ${orderData.payment_intent_id || 'No notes'}
`,
      html: `
<h2>New Order Received</h2>
<p><strong>Customer:</strong> ${orderData.customer_name}</p>
<p><strong>Email:</strong> ${orderData.customer_email}</p>
<p><strong>Phone:</strong> ${orderData.customer_phone}</p>
<p><strong>Address:</strong> ${orderData.shipping_address}</p>
<p><strong>Total:</strong> GH₵${orderData.total_amount.toFixed(2)}</p>

<h3>Items:</h3>
<ul>
  ${items.map(item => `<li>${item.productName || 'Product'} - Qty: ${item.quantity} - Price: GH₵${item.price.toFixed(2)}</li>`).join('')}
</ul>

<p><strong>Notes:</strong> ${orderData.payment_intent_id || 'No notes'}</p>
`
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Order email notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending email notification:', error);
    return false;
  }
};

/**
 * Send an SMS notification about a new order
 */
export const sendOrderSmsNotification = async (orderData: any) => {
  try {
    // Create Twilio client
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);
    
    // SMS content
    const message = `New order received from ${orderData.customer_name} for GH₵${orderData.total_amount.toFixed(2)}. Check your email for details.`;
    
    // Send SMS
    await client.messages.create({
      body: message,
      from: twilioConfig.fromNumber,
      to: notificationConfig.phone
    });
    
    console.log('Order SMS notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    return false;
  }
};

/**
 * Send a notification about a new contact message
 */
export const sendContactMessageNotification = async (messageData: any) => {
  try {
    // Create email transporter
    const transporter = nodemailer.createTransport(emailConfig);
    
    // Email content
    const mailOptions = {
      from: emailConfig.auth.user,
      to: notificationConfig.email,
      subject: `New Contact Message from ${messageData.name}`,
      text: `
New contact message received:

Name: ${messageData.name}
Email: ${messageData.email}
Phone: ${messageData.phone || 'Not provided'}

Message:
${messageData.message}
`,
      html: `
<h2>New Contact Message</h2>
<p><strong>Name:</strong> ${messageData.name}</p>
<p><strong>Email:</strong> ${messageData.email}</p>
<p><strong>Phone:</strong> ${messageData.phone || 'Not provided'}</p>

<h3>Message:</h3>
<p>${messageData.message}</p>
`
    };
    
    // Send email
    await transporter.sendMail(mailOptions);
    
    // Also send SMS for urgent notification
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);
    await client.messages.create({
      body: `New contact message from ${messageData.name}. Check your email for details.`,
      from: twilioConfig.fromNumber,
      to: notificationConfig.phone
    });
    
    console.log('Contact message notification sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending contact message notification:', error);
    return false;
  }
};
