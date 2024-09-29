'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import ApiService from '@/lib/apiService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  description: z.string().min(10, 'Description should be at least 10 characters long'),
  category: z.string().min(1, 'Category is required'),
  price: z.preprocess(val => parseFloat(val as string), z.number().min(10, 'Price must be at least 10')),
  discountPercentage: z.preprocess(
    val => parseFloat(val as string),
    z.number().min(0).max(100, 'Discount percentage must be between 0 and 100')
  ),
  stock: z.preprocess(val => parseInt(val as string, 10), z.number().min(1, 'Stock must be at least 1')),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  onClose: () => void;
  setRefresh: React.Dispatch<React.SetStateAction<number>>;
  productId?: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ onClose, setRefresh, productId }) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      category: '',
      price: 0,
      discountPercentage: 0,
      stock: 0,
      tags: [],
      images: [],
    },
  });

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const selectedFiles = [...imageFiles, ...files].slice(0, 4);
    setImageFiles(selectedFiles);

    const filePreviews = selectedFiles.map(file => URL.createObjectURL(file));
    setImagePreviews(filePreviews);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    URL.revokeObjectURL(imagePreviews[index]);
    setImageFiles(updatedFiles);
    setImagePreviews(updatedPreviews);
  };

  const onSubmit = async (data: ProductFormValues) => {
    if (imageFiles.length === 0) {
      form.setError('images', { message: 'select one image' });
      return;
    } else {
      form.clearErrors();
    }

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('price', data.price.toString());
    formData.append('stock', data.stock.toString());
    formData.append('discountPercentage', data.discountPercentage.toString());

    imageFiles.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await ApiService.post('/products', formData);
      console.log(response.data);
      if (response.status === 201) {
        setRefresh((prev: any) => prev + 1);
        onClose();
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Product Description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Product Category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Product Price" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Stock */}
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Available Stock" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Discount Percentage */}
        <FormField
          control={form.control}
          name="discountPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Percentage</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Discount Percentage" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Images */}
        <FormItem>
          <FormLabel>Upload Images (Max 4)</FormLabel>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="block w-full p-2 border border-gray-300 rounded"
          />
          {imageFiles.length > 0 && (
            <div className="mt-2 gap-4 grid grid-cols-2">
              {imageFiles.map((file, index) => (
                <div key={index} className="relative flex items-center gap-2">
                  <img
                    src={imagePreviews[index]}
                    alt={`Preview ${index + 1}`}
                    className="object-contain w-[100px] !h-10 border border-gray-300 rounded mb-2"
                  />
                  <p className="text-sm text-gray-600">{file.name}</p>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
          {form.formState?.errors?.images && (
            <p className="text-sm text-red-500">{form.formState.errors.images.message}</p>
          )}
        </FormItem>

        <Separator className="my-4" />

        {/* Submit Button */}
        <Button type="submit" className="px-8">
          Add Product
        </Button>
      </form>
    </Form>
  );
};

export default ProductForm;
