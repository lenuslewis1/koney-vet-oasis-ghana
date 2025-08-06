// EmailJS Debug Utility
// Use this to verify your EmailJS setup

export const debugEmailJSSetup = () => {
  console.log('🔍 EmailJS Configuration Debug:');
  console.log('================================');
  
  // Check environment variables
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  console.log('Public Key from env:', publicKey ? `${publicKey.substring(0, 10)}...` : 'NOT SET');
  
  // Check if .env file exists and is loaded
  console.log('All env variables:', import.meta.env);
  
  // Service configuration
  console.log('Service ID: service_uehk5ke');
  console.log('Template ID: template_oqhdtrr');
  console.log('Admin Email: koneysvethospital@gmail.com');
  
  // Instructions
  console.log('\n📋 Setup Instructions:');
  console.log('1. Go to https://dashboard.emailjs.com/admin/account');
  console.log('2. Copy your Public Key');
  console.log('3. Create .env file in project root with:');
  console.log('   VITE_EMAILJS_PUBLIC_KEY=your_actual_key_here');
  console.log('4. Restart your development server');
  
  return {
    hasPublicKey: !!publicKey && publicKey !== 'your_public_key_here',
    publicKey: publicKey,
    serviceId: 'service_uehk5ke',
    templateId: 'template_oqhdtrr'
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
    
    console.log('✅ EmailJS connection test passed');
    return true;
  } catch (error) {
    console.error('❌ EmailJS connection test failed:', error);
    return false;
  }
};
