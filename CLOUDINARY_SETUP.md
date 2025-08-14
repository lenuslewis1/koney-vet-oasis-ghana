# Cloudinary Integration Guide

## Overview
This document explains how to set up and use Cloudinary for image uploads in the Koney Vet Oasis admin dashboard.

## Setup Steps

1. **Create a Cloudinary Account**:
   - Go to [Cloudinary.com](https://cloudinary.com/) and sign up for a free account
   - Once registered, navigate to your Dashboard

2. **Get Your Cloud Name**:
   - In your Cloudinary Dashboard, note your "Cloud Name" (shown at the top of the dashboard)
   - This will be used in your configuration

3. **Create an Upload Preset**:
   - Go to Settings > Upload
   - Scroll down to "Upload presets" and click "Add upload preset"
   - Your upload preset ID is: `7b0649d5-a342-436c-be66-17eb212dd64f`
   - Ensure "Signing Mode" is set to "Unsigned" for frontend uploads
   - Configure other settings as needed (e.g., folder path, transformations)
   - Click "Save"

4. **Update Environment Variables**:
   - Open your `.env` file and add the following:
   ```
   VITE_CLOUDINARY_CLOUD_NAME=koneyvet
   VITE_CLOUDINARY_UPLOAD_PRESET=7b0649d5-a342-436c-be66-17eb212dd64f
   ```

## How It Works

1. **Uploading Images**:
   - In the admin dashboard, when adding or editing a product, click "Upload Image to Cloudinary"
   - Select an image file from your computer
   - The image will be uploaded directly to Cloudinary (not stored in your database)
   - Once upload completes, the Cloudinary URL will be automatically filled in the form

2. **Storing URLs**:
   - Only the Cloudinary image URL is stored in your Supabase database
   - This provides efficient storage and fast image delivery

3. **Image Optimization**:
   - Cloudinary automatically optimizes images for web delivery
   - You can add transformations to the URL if needed (resizing, cropping, etc.)

## Troubleshooting

If image uploads aren't working:

1. **Check Console for Errors**:
   - Open browser developer tools and check the console for any error messages

2. **Verify Environment Variables**:
   - Make sure your `.env` file has the correct Cloudinary values
   - Remember to restart your development server after changing `.env`

3. **CORS Issues**:
   - If you encounter CORS errors, check your Cloudinary upload preset settings
   - Ensure the preset is set to "Unsigned" for frontend uploads

4. **Preview Not Loading**:
   - If the image preview doesn't appear, check that the URL format is correct
   - Cloudinary URLs typically look like: `https://res.cloudinary.com/your-cloud-name/image/upload/...`

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary React SDK](https://cloudinary.com/documentation/react_integration)
- [Cloudinary Image Transformations](https://cloudinary.com/documentation/image_transformations)
