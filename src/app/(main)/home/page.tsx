import Product from '@/components/card/Product';
import Container from '@/components/common/Container';
import Grid from '@/components/common/GridLayout';
import { PRODUCT } from '@/constants/endpoints';

export default async function Home() {
  try {
    const query = {
      limit: 10,
    };
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${PRODUCT.GET(query)}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const products = await response.json();

    return (
      <>
        <Container className="mt-12">
          <Grid itemsPerRow={4}>
            {products.map((product: any) => (
              <Product key={product.id} product={product} />
            ))}
          </Grid>
        </Container>
      </>
    );
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return <div>Error loading products.</div>;
  }
}
