'use client';
import React, { useEffect, useState } from 'react';
import ApiService from '@/lib/apiService';
import authService from '@/lib/authService';
import { PRODUCT } from '@/constants/endpoints';
import Product from '../card/Product';
import Grid from '../common/GridLayout';
import Text from '../common/Text';
import { Separator } from '@radix-ui/react-separator';
import Box from '../common/BoxLayout';

export default function RecommendedProducts() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        if (authService.isAuthenticated()) {
          const user = authService.getUser();
          const id = user?.id;
          if (!id) return (data = []);
          data = await ApiService.get(PRODUCT.RECOMMEND(id));
        } else {
          data = [];
        }
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!products || products.length === 0) return <></>;

  return (
    <>
      <Box className="justify-start gap-2">
        <div className="h-8 w-3 bg-primary rounded-sm"></div>
        <Text>Recommendations</Text>
      </Box>
      <Text className="text-2xl font-semibold mt-3">Recommended Products:</Text>
      <Grid itemsPerRow={4} className="mt-5">
        {products.map((product: any) => (
          <Product key={product._id} product={product} />
        ))}
      </Grid>
      <Separator className="my-10 w-full h-[1px] bg-gray-300" />
    </>
  );
}
