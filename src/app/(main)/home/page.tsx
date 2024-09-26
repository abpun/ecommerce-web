import Text from '@/components/common/Text';
import Product from '@/components/card/Product';
import { PRODUCT } from '@/constants/endpoints';
import Grid from '@/components/common/GridLayout';
import Container from '@/components/common/Container';
import ProductsByCategories from '@/components/sections/ProductsByCategories';
import RecommendedProducts from '@/components/sections/RecommendedProducts';

export default async function Home() {
  try {
    const query = {
      limit: 10,
    };
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${PRODUCT.GET(query)}`;
    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Network response was not ok');
    const products = await response.json();

    return (
      <Container className="mt-2">
        <RecommendedProducts />
        <ProductsByCategories />
        <Text className="text-2xl font-semibold">Our Products:</Text>
        <Grid itemsPerRow={4} className="mt-4">
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
