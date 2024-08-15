import Image from 'next/image';
import Box from '../common/BoxLayout';
import Text from '../common/Text';
import { EyeIcon, HeartIcon, StarHalfIcon, StarIcon } from 'lucide-react';

type ProductProps = {
  product?: any;
};

export default function Product({ product }: ProductProps) {
  return (
    <Box className="flex-col w-[270px] gap-4 items-start">
      <ProductHead product={product} />
      <ProductBody product={product} />
    </Box>
  );
}

const ProductHead = ({ product }: ProductProps) => {
  return (
    <Box className="relative rounded-md overflow-hidden">
      <Text type="span" className="absolute left-4 top-4 bg-primary px-2 py-1 text-white rounded-sm">
        -{product.discountPercentage}%
      </Text>
      <Box className="absolute flex-col gap-4 right-4 top-4">
        <Box className="rounded-full bg-white w-8 h-8">
          <HeartIcon size={18} />
        </Box>
        <Box className="rounded-full bg-white w-8 h-8">
          <EyeIcon size={18} />
        </Box>
      </Box>
      <Box className="h-[250px] w-[270px] bg-gray-100">
        <Image src={product.thumbnail} width={200} height={180} alt="product thumbnail" className="object-cover" />
      </Box>
    </Box>
  );
};

const ProductBody = ({ product }: ProductProps) => {
  const discountedPrice = (product.price - product.price * (product.discountPercentage / 100)).toFixed(2);

  return (
    <Box className="flex-col mt-2 gap-2 items-start">
      <Text type="h4" className="font-semibold text-xl overflow-hidden w-[90%] text-ellipsis whitespace-nowrap">
        {product.title ?? 'title'}
      </Text>
      <Box className="gap-4 font-semibold text-xl">
        <Text type="p" className="text-primary">
          ${discountedPrice}
        </Text>
        <Text type="span" className="line-through text-gray-400">
          ${product.price}
        </Text>
      </Box>
      <ProductRating />
    </Box>
  );
};

const ProductRating = () => {
  return (
    <Box>
      {Array.from({ length: 4 }, (_, index) => index).map(value => (
        <StarIcon key={value} fill="orange" stroke="none" />
      ))}
      <StarHalfIcon fill="orange" stroke="none" />
      <Text>(88)</Text>
    </Box>
  );
};
