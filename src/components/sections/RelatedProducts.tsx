import React from 'react';
import Text from '../common/Text';
import Box from '../common/BoxLayout';
import Product from '../card/Product';
import Grid from '../common/GridLayout';
import ApiService from '@/lib/apiService';
import { PRODUCT } from '@/constants/endpoints';

export default function RelatedProducts({ id }: { id: string }) {
  const [products, setProducts] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await ApiService.get(PRODUCT.GET_RELATED(id));

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
  if (products.length === 0) return <></>;

  return (
    <>
      <Box className="justify-start gap-2">
        <div className="h-8 w-3 bg-primary rounded-sm"></div>
        <Text className="font-semibold text-primary">Related Item</Text>
      </Box>
      <Grid itemsPerRow={4} className="mt-4 mb-8">
        {products.map((product: any) => (
          <Product key={product.id} product={product} />
        ))}
      </Grid>
    </>
  );
}
