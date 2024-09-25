'use client';
import React from 'react';
import ApiService from '@/lib/apiService';
import Text from '@/components/common/Text';
import authService from '@/lib/authService';
import Box from '@/components/common/BoxLayout';
import Container from '@/components/common/Container';
import ProductImages from '@/components/card/ProductImages';

import { cn } from '@/lib/utils';
import { PRODUCT_USER } from '@/constants/endpoints';
import { Separator } from '@radix-ui/react-separator';
import { ProductRating } from '@/components/card/ProductRating';
import ActionButtons from '@/components/card/ActionButtons';
import Reviews from '@/components/card/Reviews';
import RelatedProducts from '@/components/sections/RelatedProducts';

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDataAndPostInteraction = async () => {
      try {
        setLoading(true);
        const data = await ApiService.get(`/products/${params.id}`);
        setProduct(data);

        if (authService.isAuthenticated()) {
          const uid = authService.getUser()?.id;
          await ApiService.post(PRODUCT_USER.ADD_LIKE, {
            userId: uid,
            productId: data._id,
            interactionType: 'view',
          });
        }
      } catch (err) {
        setError('Failed to fetch product.');
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndPostInteraction();
  }, [params.id]);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>{error}</Container>;
  }

  if (!product) {
    return <Container>No product found.</Container>;
  }

  return (
    <Container>
      <Box className="w-full justify-start gap-16">
        <ProductImages images={product.images} />
      </Box>
      <Box className="w-4/5 flex-col self-start items-start">
        <div className="space-y-5 mt-12">
          <Text className="text-2xl">{product.title}</Text>
          <Box className="gap-4 justify-start">
            <ProductRating rating={product.rating} totalReviews={product.reviews.length} showCount={false} />
            <Text>({product.reviews.length} Reviews)</Text>
            <Text className={cn(product.stock > 0 ? 'text-green-500' : 'text-red-500')}>
              {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            </Text>
          </Box>
          <Text className="text-3xl">${product.price}</Text>
          <Text className="mt-5">{product.description}</Text>
        </div>
        <ActionButtons product={product} />
        <Separator className="my-10 w-full h-[1px] bg-gray-300" />
        <Reviews reviews={product.reviews} />
      </Box>
      <Separator className="my-10 w-full h-[1px] bg-gray-300" />
      <RelatedProducts id={product._id} />
    </Container>
  );
}
