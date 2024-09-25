'use client';
import React from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { MinusIcon, PlusIcon } from 'lucide-react';
import LikeButton from '../actions/LikeButton';

export default function ActionButtons({ product }: any) {
  const form = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const handleIncrement = () => {
    const currentQuantity = form.getValues('quantity');
    const q = parseInt(currentQuantity.toString());
    form.setValue('quantity', q + 1);
  };

  const handleDecrement = () => {
    const currentQuantity = form.getValues('quantity');
    const q = parseInt(currentQuantity.toString());
    if (q > 1) {
      form.setValue('quantity', q - 1);
    }
  };

  return (
    <form className="flex gap-4 mt-5">
      <div className="flex">
        <Button size="sm" type="button" variant="outline" className="rounded-r-none" onClick={handleDecrement}>
          <MinusIcon size={16} />
        </Button>
        <Input
          {...form.register('quantity')}
          className="w-[68px] h-9 border-x-0 text-center rounded-none outline-none focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-transparent"
        />
        <Button size="sm" type="button" className="rounded-l-none" onClick={handleIncrement}>
          <PlusIcon size={16} />
        </Button>
      </div>

      <Button className="w-40" size="sm">
        Buy Now
      </Button>

      <LikeButton className="border border-gray-500 rounded-sm size-9" product={product} />
    </form>
  );
}
