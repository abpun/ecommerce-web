'use client';
import React from 'react';
import Text from '@/components/common/Text';
import useCartStore from '@/lib/cartService';
import Grid from '@/components/common/GridLayout';
import Checkout from '@/components/forms/Checkout';
import Container from '@/components/common/Container';
import CartCheckout from '@/components/cart/CartCheckout';

import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CartItem as CartItemProps } from '@/lib/cartService';
import { checkoutSchema } from '@/lib/validators/checkoutSchema';
import { toast } from 'sonner';
import ApiService from '@/lib/apiService';

export default function page() {
  const cartStore = useCartStore();
  const [cart, setCart] = React.useState<CartItemProps[]>([]);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      payment_method: 'cash',
    },
    resolver: zodResolver(checkoutSchema),
  });

  React.useEffect(() => {
    const cartData = cartStore.cart;
    setCart(cartData);
  }, [cartStore.cart]);

  const onSubmit = async (data: any) => {
    const cartItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));
    if (!cartItems || cartItems.length === 0) {
      return toast.error('Please add items in the cart');
    }
    data.cartItems = cartItems;
    try {
      const res = await ApiService.post('/orders', data);
      if (res.status === 201) {
        toast.success('Order placed successfully');
        cartStore.clearCart();
        cartStore.calculateTotal();
      }
    } catch (error) {
      toast.error('Failed to checkout');
    }
  };

  return (
    <Container>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Text className="text-2xl">Billing Details:</Text>
          <Grid itemsPerRow={2} className="gap-24">
            <div className="space-y-5">
              <Checkout form={form} />
            </div>
            <div>
              <CartCheckout form={form} />
            </div>
          </Grid>
        </form>
      </Form>
    </Container>
  );
}
