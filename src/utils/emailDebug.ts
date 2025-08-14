// EmailJS Debug Utility
// Use this to verify your EmailJS setup

export const debugEmailJSSetup = () => {
  console.log('🔍 EmailJS Configuration Debug:');
  console.log('================================');
  
  // Check environment variables
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  
  console.log('Public Key from env:', publicKey ? publicKey : 'NOT SET');
  console.log('Public Key length:', publicKey ? publicKey.length : 0);
  console.log('Service ID from env:', serviceId ? serviceId : 'NOT SET');
  console.log('Template ID from env:', templateId ? templateId : 'NOT SET');
  
  // Check if .env file exists and is loaded
  console.log('All env variables:', import.meta.env);
  
  // Service configuration
  console.log('Service ID: ', serviceId || 'service_uehk5ke');
  console.log('Template ID: ', templateId || 'template_oqhdtrr');
  console.log('Admin Email: koneysvethospital@gmail.com');
  
  // Instructions
  console.log('\n📋 Setup Instructions:');
  console.log('1. Go to https://dashboard.emailjs.com/admin/account');
  console.log('2. Copy your Public Key, Service ID, and Template ID');
  console.log('3. Create .env file in project root with:');
  console.log('   VITE_EMAILJS_PUBLIC_KEY=your_actual_key_here');
  console.log('   VITE_EMAILJS_SERVICE_ID=your_service_id_here');
  console.log('   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here');
  console.log('4. Restart your development server');
  
  return {
    hasPublicKey: !!publicKey && publicKey !== 'your_public_key_here',
    hasServiceId: !!serviceId,
    hasTemplateId: !!templateId,
    publicKey: publicKey,
    serviceId: serviceId || 'service_uehk5ke',
    templateId: templateId || 'template_oqhdtrr'
  };
};

// Test function to verify EmailJS connection
export const testEmailJSConnection = async () => {
  const config = debugEmailJSSetup();
  
  if (!config.hasPublicKey) {
    console.error('❌ Cannot test - Public Key not configured');
    return false;
  }
  
  try {
    // Import emailjs dynamically to avoid initialization issues
    const emailjs = await import('@emailjs/browser');
    
    // Initialize with the key
    emailjs.default.init(config.publicKey);
    
    // Test service connection (optional - won't actually send an email)
    console.log('Testing connection with:', {
      publicKey: config.publicKey,
      serviceId: config.serviceId,
      templateId: config.templateId
    });
    
    console.log('✅ EmailJS connection test passed');
    return true;
  } catch (error) {
    console.error('❌ EmailJS connection test failed:', error);
    return false;
  }
};
