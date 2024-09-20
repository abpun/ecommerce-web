'use client';
import { EyeIcon, HeartIcon } from 'lucide-react';
import Box from '../common/BoxLayout';
import Text from '../common/Text';
import Image from 'next/image';
import { useState } from 'react';

type ProductProps = {
  product?: any;
};

const ProductHead = ({ product }: ProductProps) => {
  const [active, setActive] = useState<boolean>(false);

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
        <Box className="rounded-full bg-white w-8 h-8 hover:text-primary cursor-pointer">
          <HeartIcon size={18} />
        </Box>
        <Box className="rounded-full bg-white w-8 h-8 hover:text-primary cursor-pointer">
          <EyeIcon size={18} />
        </Box>
      </Box>
      <Box className="h-[250px] w-full bg-gray-100">
        <Image src={product.thumbnail} width={200} height={180} alt="product thumbnail" className="object-cover" />
      </Box>
      {active && (
        <Box className="absolute cursor-pointer py-5 bg-black text-white bottom-0 left-0 w-full h-4">
          <Text>Add To Cart</Text>
        </Box>
      )}
    </Box>
  );
};

export default ProductHead;