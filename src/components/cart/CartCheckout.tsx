'use client';
import React from 'react';
import Image from 'next/image';
import Text from '../common/Text';
import Box from '../common/BoxLayout';
import useCartStore from '@/lib/cartService';
import EsewaLogo from '@/assets/images/esewa.png';

import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-separator';
import { CartItem as CartItemProps } from '@/lib/cartService';

export default function CartCheckout({ form }: any) {
  const cartStore = useCartStore();
  const [cart, setCart] = React.useState<CartItemProps[]>([]);

  React.useEffect(() => {
    cartStore.calculateTotal();
  }, []);

  React.useEffect(() => {
    const cartData = cartStore.cart;
    setCart(cartData);
  }, [cartStore.cart]);

  return (
    <div className="mt-8 py-0 px-8">
      {cart.length === 0 ? (
        <div className="min-h-20 flex mt-6 justify-center items-center shadow-[0px_0px_5px_0px_rgba(0,0,0,0.1)]">
          <Text>Please add items in the cart</Text>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </div>
      )}
      <Box className="justify-between w-full mt-8">
        <Text className="font-semibold">Subtotal:</Text>
        <Text>${cartStore.total.toFixed(2)}</Text>
      </Box>
      <Separator className="my-3 h-[1px] w-full bg-gray-300" />
      <Box className="justify-between w-full">
        <Text className="font-semibold">Shipping:</Text>
        <Text>FREE</Text>
      </Box>
      <Separator className="my-3 h-[1px] w-full bg-gray-300" />
      <Box className="justify-between w-full">
        <Text className="font-semibold">Subtotal:</Text>
        <Text>${cartStore.total.toFixed(2)}</Text>
      </Box>

      <div className="flex flex-col items-start gap-4 mt-8">
        <div className="flex justify-between w-full">
          <div className="flex gap-3 items-center">
            <input type="radio" {...form.register('payment_method')} value="bank" className="size-5 cursor-pointer" />
            <Text>Wallet</Text>
          </div>
          <Image src={EsewaLogo} alt="esewa logo" width={50} height={10} className="object-fill" />
        </div>
        <div className="flex gap-3 items-center">
          <input type="radio" {...form.register('payment_method')} value="cash" className="size-5 cursor-pointer" />
          <Text>Cash on Delivery</Text>
        </div>
      </div>

      <Button type="submit" className="mt-8 w-40">
        Place Order
      </Button>
    </div>
  );
}

const Item = ({ item }: { item: any }) => {
  return (
    <Box key={item.id} className="relative justify-between items-center">
      <Box className="gap-4 justify-start">
        <Image src={item.thumbnail} alt="product thumbnail" width={30} height={10} className="object-fill" />
        <Text className="text-ellipsis  whitespace-nowrap">{item.name}</Text>
      </Box>
      <Text className="text-center">${item.price.toFixed(2)}</Text>
    </Box>
  );
};
