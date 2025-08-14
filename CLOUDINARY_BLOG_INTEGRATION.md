# Cloudinary Integration for Blog Posts

This document explains how the blog post image upload functionality works with Cloudinary.

## Overview

The blog post management system now uses Cloudinary for image storage instead of Supabase Storage. This provides several benefits:
- Faster image delivery via Cloudinary's global CDN
- Automatic optimization of images for different devices
- More reliable image hosting
- Advanced image transformation capabilities

## How It Works

1. **Image Upload Process**
   - When creating or editing a blog post, click the "Upload Image to Cloudinary" button
   - Select an image file from your computer
   - The image is automatically uploaded to Cloudinary in the background
   - Once uploaded, the Cloudinary URL is automatically filled in the form
   - The image preview will show the uploaded image

2. **Authentication Method**
   - The system uses API Key + Secret authentication for secure uploads
   - The image upload request is signed using a SHA-1 signature
   - All authentication happens securely in the browser

3. **Database Storage**
   - Only the Cloudinary image URL is stored in your Supabase database
   - No image files are stored in your database or server

## Configuration

The system uses these environment variables:
- `VITE_CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
- `VITE_CLOUDINARY_API_KEY`: Your Cloudinary API key
- `VITE_CLOUDINARY_API_SECRET`: Your Cloudinary API secret

These are already configured in your `.env` file.

## Security Note

For production use, it's recommended to handle image uploads through a server-side endpoint rather than exposing your API secret in the client-side code. The current implementation is suitable for development and testing.

## Troubleshooting

If you encounter issues with image uploads:
1. Check your browser console for error messages
2. Verify your Cloudinary credentials are correct
3. Make sure your Cloudinary account has not reached its usage limits
4. Try a different image file (under 10MB, in a standard format like JPG, PNG, or GIF)

## Image Transformations

You can apply Cloudinary transformations to your images by modifying the URL. For example:
- To resize an image to 300x200: `https://res.cloudinary.com/your-cloud/image/upload/w_300,h_200/your_image.jpg`
- To crop an image: `https://res.cloudinary.com/your-cloud/image/upload/c_crop,g_face/your_image.jpg`

See [Cloudinary documentation](https://cloudinary.com/documentation/image_transformations) for more options.
