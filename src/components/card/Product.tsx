import Box from '../common/BoxLayout';
import Text from '../common/Text';
import { StarHalfIcon, StarIcon } from 'lucide-react';
import ProductHead from './ProductHead';

type ProductProps = {
  product?: any;
};

export default function Product({ product }: ProductProps) {
  return (
    <Box className="flex-col gap-4 items-start">
      <ProductHead product={product} />
      <ProductBody product={product} />
    </Box>
  );
}

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
