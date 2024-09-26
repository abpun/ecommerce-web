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
import authService from '@/lib/authService';
import { PAYMENT } from '@/constants/endpoints';

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

  const createKhaltiPayload = (order: any) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || null;
    if (!baseUrl) {
      throw new Error('Base URL is not defined');
    }

    return {
      customer_info: {
        name: order.name,
        email: order.email,
        phone: order.phone,
      },
      purchase_order_id: order._id,
      amount: order.total * 100,
      purchase_order_name: order.order_name,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment`,
      website_url: process.env.NEXT_PUBLIC_BASE_URL,
    };
  };

  const onSubmit = async (data: any) => {
    const cartItems = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price,
    }));

    if (!cartItems || cartItems.length === 0) {
      return toast.error('Please add items in the cart');
    }

    if (!authService.isAuthenticated()) {
      return toast.error('Please login to continue');
    }

    data.cartItems = cartItems;
    data.userId = authService.getUser()?.id;

    try {
      const res = await ApiService.post('/orders', data);
      if (res.status === 201) {
        toast.success('Order placed successfully');
        if (data.payment_method === 'bank') {
          const payload = createKhaltiPayload(res.order);
          const khaltiUrl = process.env.NEXT_PUBLIC_KHALTI_URL || null;
          if (!khaltiUrl) throw new Error('Khalti URL is not defined');

          const khaltiRes = await fetch(khaltiUrl, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `key live_secret_key_68791341fdd94846a146f0457ff7b455`,
            },
          });
          if (!khaltiRes.ok) throw new Error('Network response was not ok');
          const khalti_res = await khaltiRes.json();

          const paymentData = {
            orderId: res.order._id,
            amount: res.order.total,
            userId: res.order.userId,
            pidx: khalti_res.pidx,
          };
          const paymentRes = await ApiService.post(PAYMENT.CREATE, paymentData);
          if (paymentRes.status !== 201) throw new Error('Error create payment');
          window.location.href = khalti_res.payment_url;
        }
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
