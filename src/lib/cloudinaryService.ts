import SHA1 from 'crypto-js/sha1';
import enc from 'crypto-js/enc-hex';

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  resource_type: string;
}

// Get environment variables with fallbacks
const CLOUDINARY_API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY || '176633535686223';
const CLOUDINARY_API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET || 'EV4iOCOJEWA8hYd0eETPX-4HK4o';
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzmvzdcpx';

// Function to generate signature for Cloudinary authentication
const generateSignature = (timestamp: string, apiSecret: string): string => {
  // Create the string to hash (format: timestamp=1234567890<secret>)
  const stringToSign = `timestamp=${timestamp}${apiSecret}`;
  
  // Generate SHA1 hash and convert to hex
  const hash = SHA1(stringToSign);
  return hash.toString(enc);
};

export const uploadToCloudinary = async (file: File): Promise<string> => {
  try {
    console.log('Uploading to Cloudinary using API Key authentication');
    console.log('Cloud name:', CLOUDINARY_CLOUD_NAME);
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', CLOUDINARY_API_KEY);
    
    // Generate timestamp and signature for authentication
    const timestamp = Math.floor(Date.now() / 1000).toString();
    formData.append('timestamp', timestamp);
    
    // Generate signature for authentication
    const signature = generateSignature(timestamp, CLOUDINARY_API_SECRET);
    formData.append('signature', signature);
    
    // Build the upload URL
    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`;
    console.log('Upload URL:', uploadUrl);
    
    // Using fetch for the upload request with API Key authentication
    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData
    });
    
    // Handle error responses from Cloudinary
    if (!response.ok) {
      let errorMessage = `Cloudinary upload failed: ${response.status} ${response.statusText}`;
      try {
        const errorData = await response.json();
        console.error('Cloudinary error details:', errorData);
        if (errorData.error && errorData.error.message) {
          errorMessage += ` - ${errorData.error.message}`;
        }
      } catch (jsonError) {
        console.error('Could not parse error response from Cloudinary');
      }
      throw new Error(errorMessage);
    }
    
    // Parse successful response
    const data = await response.json();
    console.log('Cloudinary upload successful!');
    
    // Return the secure URL for the uploaded image
    return data.secure_url;
  } catch (error: any) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error(`Failed to upload image to Cloudinary: ${error.message || 'Unknown error'}`);
  }
};
