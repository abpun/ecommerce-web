import Product from '@/components/card/Product';
import Box from '@/components/common/BoxLayout';
import Container from '@/components/common/Container';
import Grid from '@/components/common/GridLayout';
import Text from '@/components/common/Text';
import { PRODUCT } from '@/constants/endpoints';
import React from 'react';

export default async function page({ params }: { params: { name: string } }) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${PRODUCT.GET_BY_CATEGORY(params.name)}`;
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Network response was not ok');
    const products = await response.json();

    return (
      <Container className="mt-2">
        <Box className="justify-start gap-2">
          <div className="h-8 w-3 bg-primary rounded-sm"></div>
          <Text>By categories</Text>
        </Box>
        <Text className="text-2xl font-semibold mt-4">Category:</Text>
        <Grid itemsPerRow={4} className="mt-5">
          {products.map((product: any) => (
            <Product key={product.id} product={product} />
          ))}
        </Grid>
      </Container>
    );
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return <div>Error loading products.</div>;
  }
}
