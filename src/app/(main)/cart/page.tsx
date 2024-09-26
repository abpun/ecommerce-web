import Text from '@/components/common/Text';
import CartStore from '@/components/cart/CartStore';
import Container from '@/components/common/Container';
import CustomBreadcrumb from '@/components/common/Breadcrumb';
import Grid from '@/components/common/GridLayout';
import CartDetails from '@/components/cart/CartDetails';

export default async function Home() {
  return (
    <Container className="mx-auto mt-2">
      <div className="">
        <CustomBreadcrumb />
      </div>

      <Grid
        itemsPerRow={4}
        className="mt-8 justify-between py-4 px-8 rounded-sm shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]"
      >
        <Text className="font-semibold">Product</Text>
        <Text className="text-center font-semibold">Price</Text>
        <Text className="text-center font-semibold">Quantity</Text>
        <Text className="text-right font-semibold">Subtotal</Text>
      </Grid>

      <CartStore />
      <CartDetails />
    </Container>
  );
}
