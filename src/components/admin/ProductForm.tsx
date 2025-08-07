import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
// Define Product type manually if not exported from Supabase types
type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
};

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSuccess, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    category: product?.category || "",
    stock: product?.stock || 0,
    image_url: product?.image_url || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle image upload to Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (uploadError) throw uploadError;
      // Get public URL
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);
      setUploadedUrl(data.publicUrl);
      setFormData((prev) => ({ ...prev, image_url: data.publicUrl }));
    } catch (err: any) {
      setError(err?.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, image_url: e.target.value });
    setUploadedUrl(null); // If user types a link, clear uploaded
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (product) {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(formData)
          .eq("id", product.id);

        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase.from("products").insert([formData]);

        if (error) throw error;
      }

      onSuccess();
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg shadow-sm animate-pulse">
          {error}
        </div>
      )}

      {formData.stock === 0 && (
        <span className="inline-block px-3 py-1 rounded bg-red-100 text-red-700 text-sm font-semibold mb-2">Out of stock</span>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:border-blue-500 focus:ring-blue-500"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            <option value="food">Pet Food</option>
            <option value="toys">Toys</option>
            <option value="accessories">Accessories</option>
            <option value="health">Health & Wellness</option>
            <option value="grooming">Grooming</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          required
          rows={3}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:border-blue-500 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <div className="mt-1 relative rounded-lg shadow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="number"
              id="price"
              required
              min="0"
              step="0.01"
              className="pl-7 block w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: parseFloat(e.target.value) })
              }
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock
          </label>
          <input
            type="number"
            id="stock"
            required
            min="0"
            className="mt-1 block w-full rounded-lg border-gray-300 shadow focus:border-blue-500 focus:ring-blue-500"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: parseInt(e.target.value) })
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Image
        </label>
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div className="flex-1">
            <input
              type="url"
              placeholder="Paste image link or upload below"
              className="block w-full rounded-lg border-gray-300 shadow focus:border-blue-500 focus:ring-blue-500"
              value={uploadedUrl ? uploadedUrl : formData.image_url}
              onChange={handleImageUrlChange}
              disabled={uploading}
            />
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageUpload}
              disabled={uploading}
            />
            <button
              type="button"
              className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm hover:bg-gray-200 transition"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>
        {(formData.image_url || uploadedUrl) && (
          <div className="mt-3">
            <img
              src={uploadedUrl || formData.image_url}
              alt="Preview"
              className="h-24 w-24 object-cover rounded border"
            />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-lg shadow text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition"
        >
          {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </button>
        {product && (
          <button
            type="button"
            className="px-4 py-2 border border-red-500 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 transition"
            disabled={loading || formData.stock === 0}
            onClick={async () => {
              setLoading(true);
              setError(null);
              try {
                const { error } = await supabase
                  .from("products")
                  .update({ stock: 0 })
                  .eq("id", product.id);
                if (error) throw error;
                setFormData((prev) => ({ ...prev, stock: 0 }));
                onSuccess();
              } catch (err: any) {
                setError(err?.message || "Failed to mark out of stock");
              } finally {
                setLoading(false);
              }
            }}
          >
            Mark Out of Stock
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
