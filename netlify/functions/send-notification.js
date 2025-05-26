// Netlify serverless function to handle email and SMS notifications
const nodemailer = require('nodemailer');
const twilio = require('twilio');

// Email configuration
const emailConfig = {
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'koneyvetgh@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'your-app-password'
  }
};

// Twilio configuration
const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || 'your-account-sid',
  authToken: process.env.TWILIO_AUTH_TOKEN || 'your-auth-token',
  fromNumber: process.env.TWILIO_PHONE_NUMBER || '+1234567890'
};

// Notification recipient configuration
const notificationConfig = {
  email: process.env.NOTIFICATION_EMAIL || 'koneyvetgh@gmail.com',
  phone: process.env.NOTIFICATION_PHONE || '+233XXXXXXXXX'
};

/**
 * Send an email notification
 */
async function sendEmailNotification(data, type) {
  try {
    // Create email transporter
    const transporter = nodemailer.createTransport(emailConfig);
    
    let mailOptions = {};
    
    if (type === 'order') {
      // Format order items for email
      const itemsList = data.items.map(item => 
        `${item.productName || 'Product'} - Qty: ${item.quantity} - Price: GH₵${item.price.toFixed(2)}`
      ).join('\n');
      
      // Email content for order
      mailOptions = {
        from: emailConfig.auth.user,
        to: notificationConfig.email,
        subject: `New Order from ${data.customerName}`,
        text: `
New order received:\n
Customer: ${data.customerName}
Email: ${data.customerEmail}
Phone: ${data.customerPhone}
Address: ${data.address || 'Not provided'}
Total: GH₵${data.totalAmount.toFixed(2)}\n
Items:\n${itemsList}\n
Notes: ${data.notes || 'No notes'}
`,
        html: `
<h2>New Order Received</h2>
<p><strong>Customer:</strong> ${data.customerName}</p>
<p><strong>Email:</strong> ${data.customerEmail}</p>
<p><strong>Phone:</strong> ${data.customerPhone}</p>
<p><strong>Address:</strong> ${data.address || 'Not provided'}</p>
<p><strong>Total:</strong> GH₵${data.totalAmount.toFixed(2)}</p>

<h3>Items:</h3>
<ul>
  ${data.items.map(item => `<li>${item.productName || 'Product'} - Qty: ${item.quantity} - Price: GH₵${item.price.toFixed(2)}</li>`).join('')}
</ul>

<p><strong>Notes:</strong> ${data.notes || 'No notes'}</p>
`
      };
    } else if (type === 'contact') {
      // Email content for contact message
      mailOptions = {
        from: emailConfig.auth.user,
        to: notificationConfig.email,
        subject: `New Contact Message from ${data.name}`,
        text: `
New contact message received:\n
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}\n
Message:\n${data.message}
`,
        html: `
<h2>New Contact Message</h2>
<p><strong>Name:</strong> ${data.name}</p>
<p><strong>Email:</strong> ${data.email}</p>
<p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>

<h3>Message:</h3>
<p>${data.message}</p>
`
      };
    }
    
    // Send email
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending email notification:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send an SMS notification
 */
async function sendSmsNotification(data, type) {
  try {
    // Create Twilio client
    const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);
    
    let message = '';
    
    if (type === 'order') {
      // SMS content for order
      message = `New order received from ${data.customerName} for GH₵${data.totalAmount.toFixed(2)}. Check your email for details.`;
    } else if (type === 'contact') {
      // SMS content for contact message
      message = `New contact message from ${data.name}. Check your email for details.`;
    }
    
    // Send SMS
    await client.messages.create({
      body: message,
      from: twilioConfig.fromNumber,
      to: notificationConfig.phone
    });
    
    return { success: true };
  } catch (error) {
    console.error('Error sending SMS notification:', error);
    return { success: false, error: error.message };
  }
}

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }
  
  try {
    // Parse the request body
    const data = JSON.parse(event.body);
    const { type } = data;
    
    if (!type || (type !== 'order' && type !== 'contact')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Invalid notification type' })
      };
    }
    
    // Send notifications
    const emailResult = await sendEmailNotification(data, type);
    const smsResult = await sendSmsNotification(data, type);
    
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Notifications sent successfully',
        email: emailResult,
        sms: smsResult
      })
    };
  } catch (error) {
    console.error('Error in notification function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending notifications', error: error.message })
    };
  }
};
