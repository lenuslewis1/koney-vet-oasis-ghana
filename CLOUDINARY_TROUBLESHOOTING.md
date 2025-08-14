# Cloudinary Troubleshooting Guide

## Fixing 401 Unauthorized Errors

If you're seeing a 401 (Unauthorized) error when trying to upload images to Cloudinary, follow these steps to fix the issue:

### Step 1: Verify Your Upload Preset Settings

1. Log in to your Cloudinary Dashboard: https://cloudinary.com/console
2. Go to Settings > Upload
3. Scroll down to "Upload presets"
4. Find your upload preset (current ID: `7b0649d5-a342-436c-be66-17eb212dd64f`)
5. Click "Edit"
6. **Most important:** Ensure "Signing Mode" is set to "Unsigned" (not "Signed")
7. Save your changes

### Step 2: Create a New Upload Preset (if needed)

If changing the settings didn't work, create a new upload preset:

1. Go to Settings > Upload
2. Scroll down to "Upload presets" and click "Add upload preset"
3. Give it a name like "koney_vet_uploads"
4. Set "Signing Mode" to "Unsigned"
5. Configure other settings as needed
6. Click "Save"
7. Note the new preset ID
8. Update your `.env` file with the new preset ID

### Step 3: Check CORS Configuration

1. Go to Settings > Upload
2. Scroll down to "Upload Control"
3. Ensure CORS is enabled and includes your domain
4. If not, add `*` for testing (replace with your actual domain in production)

### Step 4: Update Your Environment Variables

Make sure your `.env` file has the correct values:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_id
```

### Step 5: Use the CloudinaryTester Component

1. Add the `<CloudinaryTester />` component to an admin page
2. Use it to validate your cloud name and upload preset
3. Test uploading an image to verify everything works

## Common Errors and Solutions

### 401 Unauthorized
- Make sure upload preset is set to "Unsigned"
- Verify cloud name spelling
- Ensure upload preset ID is correct

### 404 Not Found
- Check if cloud name exists and is spelled correctly
- Verify API endpoint URL (should be `https://api.cloudinary.com/v1_1/your-cloud-name/upload`)

### CORS Errors
- Enable CORS in Cloudinary settings
- Add your domain to allowed origins

## Testing Direct API Access

You can test a direct upload to Cloudinary using curl:

```bash
curl -X POST \
  -F "file=@path/to/your/image.jpg" \
  -F "upload_preset=your_upload_preset_id" \
  https://api.cloudinary.com/v1_1/your_cloud_name/upload
```

If this works but browser uploads don't, you likely have a CORS issue.

## Need More Help?

Check the official Cloudinary documentation:
- [Upload API Reference](https://cloudinary.com/documentation/upload_images)
- [Upload Presets](https://cloudinary.com/documentation/upload_presets)
- [CORS Configuration](https://cloudinary.com/documentation/upload_images#cors_considerations)
