import Product from '@/components/card/Product';
import Container from '@/components/common/Container';
import Grid from '@/components/common/GridLayout';
import Footer from '@/components/menu/Footer';
import Navbar from '@/components/menu/Navbar';
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
        <Navbar />
        <Container>
          <Grid itemsPerRow={4}>
            {products.map((product: any) => (
              <Product key={product.id} product={product} />
            ))}
          </Grid>
        </Container>
        <Footer />
      </>
    );
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return <div>Error loading products.</div>;
  }
}
