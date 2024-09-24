'use client';
import React from 'react';
import ApiService from '@/lib/apiService';
import Text from '@/components/common/Text';
import Box from '@/components/common/BoxLayout';
import Container from '@/components/common/Container';
import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';

export default function Page({ params }: { params: { id: string } }) {
  const [product, setProduct] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ApiService.get(`/products/${params.id}`);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
      <Box className="w-full gap-16">
        <Box className="w-2/5  items-center justify-between">
          <Box className="flex-col gap-5">
            {product.images.map((item: string) => (
              <Box>
                <Image src={item} width={80} height={30} alt="thumbnail" />
              </Box>
            ))}
          </Box>
          <Image src={product.thumbnail} width={440} height={200} alt="product" />
        </Box>
        <Box className="w-3/5 flex-col self-start items-start">
          <div className="space-y-5 mt-12">
            <Text className="text-2xl">{product.title}</Text>
            <Box className="gap-4 justify-start">
              <Text>{product.rating}</Text>
              <Text>({product.reviews.length} Reviews)</Text>
              <Text>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</Text>
            </Box>
            <Text className="text-3xl">${product.price}</Text>
            <Text className="mt-5">{product.description}</Text>
          </div>
          <Separator className="my-5 w-full h-[1px] bg-gray-300" />
        </Box>
      </Box>
    </Container>
  );
}
