import Box from '../common/BoxLayout';
import Text from '../common/Text';
import ProductHead from './ProductHead';
import { ProductRating } from './ProductRating';

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
  const totalRating = Math.abs(product?.reviews?.length + Math.floor(Math.random() * 30)) || 0;

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
      <ProductRating rating={product.rating} totalReviews={totalRating} />
    </Box>
  );
};
