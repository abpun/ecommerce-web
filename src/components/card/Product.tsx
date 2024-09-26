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
  const discountedPrice = (product.price - product.price * (product.discountPercentage / 100)) * 100;
  const totalRating = Math.abs(product?.reviews?.length + Math.floor(Math.random() * 30)) || 0;

  return (
    <div className="space-y-2 mt-2 w-full">
      <Text type="h4" className="font-semibold text-xl overflow-hidden w-[80%] text-ellipsis whitespace-nowrap">
        {product.title ?? 'title'}
      </Text>
      <Box className="gap-4 text-md justify-start">
        <Text type="p" className="text-primary font-semibold">
          Rs. {discountedPrice.toFixed(0)}
        </Text>
        <Text type="span" className="line-through text-gray-400">
          Rs. {(product.price * 100).toFixed(0)}
        </Text>
      </Box>
      <ProductRating rating={product.rating} totalReviews={totalRating} />
    </div>
  );
};
