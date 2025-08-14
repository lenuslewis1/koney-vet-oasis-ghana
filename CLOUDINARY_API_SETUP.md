# Cloudinary API Key Authentication

## Overview
This project now uses Cloudinary API key authentication for secure image uploads directly from the browser. This README explains the configuration and how it works.

## Configuration

### Environment Variables
The following environment variables should be set in your `.env` file:

```
VITE_CLOUDINARY_CLOUD_NAME=dzmvzdcpx
VITE_CLOUDINARY_API_KEY=176633535686223
VITE_CLOUDINARY_API_SECRET=EV4iOCOJEWA8hYd0eETPX-4HK4o
```

### How It Works

1. When a user uploads an image:
   - The file is read and prepared for upload
   - A timestamp is generated
   - A signature is created using the timestamp and API secret
   - The image is uploaded to Cloudinary with the API key and signature
   - Cloudinary returns the image URL, which is saved to the database

2. Security Considerations:
   - The API secret is included in the client-side code for demonstration purposes
   - In production, you should use a server-side API or serverless function to generate signatures
   - The current implementation is suitable for development and testing

### Testing the Upload

To test the Cloudinary upload functionality:

1. Go to the Products Management page in the admin dashboard
2. Click "Test Image Upload" button
3. Use the CloudinaryTester component to validate your configuration
4. Try uploading an image to verify the process works

## Troubleshooting

If you encounter issues with image uploads:

1. Check browser console for error messages
2. Verify your environment variables are correctly set
3. Ensure your Cloudinary account is active
4. Test using the CloudinaryTester component to isolate the issue

For API key security in production, consider implementing a server-side endpoint that generates signatures instead of including the API secret in client code.
