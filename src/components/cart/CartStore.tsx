'use client';
import React from 'react';
import Image from 'next/image';
import Grid from '../common/GridLayout';
import Text from '@/components/common/Text';
import useCartStore from '@/lib/cartService';
import Box from '@/components/common/BoxLayout';

import { XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { CartItem as CartItemProps } from '@/lib/cartService';

export default function CartStore() {
  const router = useRouter();
  const cartStore = useCartStore();
  const [cart, setCart] = React.useState<CartItemProps[]>([]);

  React.useEffect(() => {
    const cartData = cartStore.cart;
    setCart(cartData);
  }, [cartStore.cart]);

  const deleteCartItem = (id: any) => {
    cartStore.removeItem(id);
  };

  return (
    <>
      {cart.length === 0 ? (
        <div className="min-h-80 flex mt-6 justify-center items-center shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]">
          <Text>No items in the cart.</Text>
        </div>
      ) : (
        cart.map(item => <CartItem key={item.id} item={item} deleteItem={deleteCartItem} />)
      )}

      <Box className="justify-between mt-6">
        <Button variant="outline" size="lg" onClick={() => router.push('/home')}>
          Return to shop
        </Button>
        <Button variant="outline" size="lg">
          Update cart
        </Button>
      </Box>
    </>
  );
}

const CartItem = ({ item, deleteItem }: { item: any; deleteItem: (id: any) => void }) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Grid
      key={item.id}
      itemsPerRow={4}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="mt-8 relative justify-between items-center py-4 px-8 rounded-sm shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]"
    >
      {hover && (
        <div
          onClick={() => deleteItem(item.id)}
          className="absolute cursor-pointer size-5  border flex items-center justify-center bg-white translate-x-1/2 -translate-y-1/2 rounded-full top-0 right-0"
        >
          <XIcon size={16} className="text-red-500" />
        </div>
      )}
      <Box className="gap-4 justify-start">
        <Image src={item.thumbnail} alt="product thumbnail" width={60} height={10} className="object-fill" />
        <Text className="text-ellipsis  whitespace-nowrap">{item.name}</Text>
      </Box>
      <Text className="text-center">Rs. {(item.price * 100).toFixed(0)}</Text>
      <Text className="text-center">{item.quantity}</Text>
      <Text className="text-right">Rs. {item.subtotal.toFixed(0)}</Text>
    </Grid>
  );
};
