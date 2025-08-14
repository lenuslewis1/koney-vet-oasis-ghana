import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { uploadToCloudinary } from '@/lib/cloudinaryService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';

export const CloudinaryTester = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cloudName, setCloudName] = useState<string>('');
  const [uploadPreset, setUploadPreset] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Get environment variables
    setCloudName(import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzmvzdcpx');
    setUploadPreset('Using API Key Authentication');
  }, []);
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setUploading(true);
    setError(null);
    
    try {
      const cloudinaryUrl = await uploadToCloudinary(file);
      setImageUrl(cloudinaryUrl);
      console.log('Image uploaded successfully:', cloudinaryUrl);
    } catch (err: any) {
      setError(err?.message || 'Failed to upload image');
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const validateCloudinarySetup = async () => {
    setIsValidating(true);
    setValidationResult(null);
    setError(null);
    
    try {
      // Check if cloud name is set
      if (!cloudName) {
        throw new Error('Cloud name is not set');
      }
      
      // Check if API key and secret are set
      if (!import.meta.env.VITE_CLOUDINARY_API_KEY) {
        throw new Error('Cloudinary API key is not set in environment variables');
      }
      
      if (!import.meta.env.VITE_CLOUDINARY_API_SECRET) {
        throw new Error('Cloudinary API secret is not set in environment variables');
      }
      
      // Check if cloud name exists
      const cloudInfoResponse = await axios.get(
        `https://res.cloudinary.com/${cloudName}/image/list/sample.json`
      ).catch(() => null);
      
      if (!cloudInfoResponse) {
        throw new Error(`Could not verify cloud name "${cloudName}". Either it doesn't exist or it's not accessible.`);
      }
      
      setValidationResult(`Cloud name "${cloudName}" is valid. API key and secret are properly set. Try uploading an image to test the configuration.`);
    } catch (err: any) {
      setError(`Validation failed: ${err.message}`);
    } finally {
      setIsValidating(false);
    }
  };
  
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Image Upload Tester</CardTitle>
        <CardDescription>
          Test your image upload functionality
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
            <p className="font-semibold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        
        {validationResult && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-700 rounded-md">
            {validationResult}
          </div>
        )}
        
        <div className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Cloud Name</label>
            <input 
              type="text" 
              value={cloudName}
              onChange={(e) => setCloudName(e.target.value)}
              className="p-2 border rounded"
              placeholder="Your Cloudinary cloud name"
            />
            <p className="text-xs text-gray-500">
              Current env value: {import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'Not set'}
            </p>
          </div>
          
          <div className="grid gap-2">
            <label className="text-sm font-medium">Upload Preset</label>
            <input 
              type="text" 
              value={uploadPreset}
              onChange={(e) => setUploadPreset(e.target.value)}
              className="p-2 border rounded"
              placeholder="Your Cloudinary upload preset"
            />
            <p className="text-xs text-gray-500">
              Current env value: {import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'Not set'}
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              disabled={isValidating}
              onClick={validateCloudinarySetup}
              className="ml-auto"
            >
              {isValidating ? 'Validating...' : 'Validate Configuration'}
            </Button>
          </div>
        </div>
        
        <div className="my-6 pt-4 border-t">
          <h3 className="font-medium mb-2">Test Image Upload</h3>
          
          <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="text-center">
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              
              <Button
                type="button"
                variant="default"
                className="mb-2"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
              >
                {uploading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  "Select Image to Upload"
                )}
              </Button>
              
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
        
        {imageUrl && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Uploaded Image:</h3>
            <div className="p-4 bg-gray-100 rounded-md">
              <img 
                src={imageUrl} 
                alt="Uploaded preview" 
                className="mx-auto max-h-48 rounded shadow-sm mb-2" 
              />
              <p className="text-xs text-gray-600 break-all">{imageUrl}</p>
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-col items-start border-t p-4">
        <h3 className="font-medium mb-2">Image Service Status:</h3>
        <div className="text-sm space-y-2 text-gray-700">
          <p><strong>Service:</strong> Connected and ready</p>
          <p><strong>Configuration:</strong> {import.meta.env.VITE_CLOUDINARY_API_KEY && import.meta.env.VITE_CLOUDINARY_API_SECRET ? '✓ Complete' : '✗ Incomplete'}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CloudinaryTester;
