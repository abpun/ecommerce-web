'use client';
import React from 'react';
import Text from '../common/Text';
import Box from '../common/BoxLayout';
import useCartStore from '@/lib/cartService';

import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';

export default function CartDetails() {
  const router = useRouter();
  const cartStore = useCartStore();

  React.useEffect(() => {
    cartStore.calculateTotal();
  }, []);

  return (
    <Box className="justify-end mt-16">
      <Box className="flex-col items-start border px-6 border-gray-300 rounded-sm w-1/3 py-4">
        <Text className="font-semibold">Cart Total</Text>

        <Separator className="my-4" />
        <Box className="justify-between w-full">
          <Text className="font-semibold">Subtotal:</Text>
          <Text>Rs. {cartStore.total.toFixed(0)}</Text>
        </Box>

        <Separator className="my-4" />
        <Box className="justify-between w-full">
          <Text className="font-semibold">Shipping:</Text>
          <Text>FREE</Text>
        </Box>

        <Separator className="my-4" />

        <Button className="self-end" onClick={() => router.push('/checkout')}>
          Proceed to Checkout
        </Button>
      </Box>
    </Box>
  );
}
