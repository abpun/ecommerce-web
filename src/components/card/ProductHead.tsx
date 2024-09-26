'use client';
import Image from 'next/image';
import Text from '../common/Text';
import Box from '../common/BoxLayout';
import useCartStore from '@/lib/cartService';
import { toast } from 'sonner';
import { useState } from 'react';
import { HeartIcon, ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LikeButton from '../actions/LikeButton';
import { calculateDiscountedPrice } from '@/lib/utils';

type ProductProps = {
  product?: any;
};

const ProductHead = ({ product }: ProductProps) => {
  const router = useRouter();
  const cartStore = useCartStore();
  const [active, setActive] = useState<boolean>(false);

  const onCartAdd = (product: any) => {
    const cartItem = {
      quantity: 1,
      id: product._id,
      name: product.title,
      price: calculateDiscountedPrice(product.price, product.discountPercentage),
      thumbnail: product.thumbnail,
    };

    cartStore.addItem(cartItem);
    toast.success('Item added!');
  };

  const onProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Box
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="relative w-full rounded-md"
    >
      <Text type="span" className="absolute left-4 top-4 bg-primary px-2 py-1 text-white rounded-sm">
        -{product.discountPercentage}%
      </Text>
      <Box className="absolute flex-col gap-4 right-4 top-4">
        <LikeButton product={product} />
      </Box>
      <Box onClick={() => onProductClick(product._id)} className="h-[250px] w-full bg-gray-100">
        <Image src={product.thumbnail} width={200} height={180} alt="product thumbnail" className="object-cover" />
      </Box>
      {active && (
        <Box
          onClick={() => onCartAdd(product)}
          className="absolute cursor-pointer py-5 bg-gray-800 text-white bottom-0 left-0 w-full h-4"
        >
          <Box className="gap-4">
            <ShoppingCartIcon />
            <Text>Add To Cart</Text>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductHead;
