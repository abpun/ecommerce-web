import Product from '@/components/card/Product';
import Container from '@/components/common/Container';
import Grid from '@/components/common/GridLayout';
import Navbar from '@/components/menu/Navbar';

export default async function Home() {
  try {
    const response = await fetch('http://localhost:5000/products?limit=8');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const products = await response.json();

    console.log(products);

    return (
      <div>
        <Navbar />
        <Container>
          <Grid itemsPerRow={4}>
            {products.map((product: any) => (
              <Product key={product.id} product={product} />
            ))}
          </Grid>
        </Container>
      </div>
    );
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return <div>Error loading products.</div>;
  }
}
