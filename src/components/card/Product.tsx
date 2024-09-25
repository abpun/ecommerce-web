import Box from '../common/BoxLayout';
import Text from '../common/Text';
import { StarHalfIcon, StarIcon } from 'lucide-react';
import { BsStar } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStarFill } from 'react-icons/bs';
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
      <ProductRating
        rating={product.rating}
        totalReviews={Math.abs(product?.reviews?.length + Math.floor(Math.random() * 30)) || 0}
      />
    </Box>
  );
};

const ProductRating = ({ rating, totalReviews }: { rating: any; totalReviews: number }) => {
  const fullStars = Math.floor(parseFloat(rating));
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Box className="gap-1">
      {Array.from({ length: fullStars }, (_, index) => (
        <BsStarFill key={`full-${index}`} fill="orange" stroke="none" />
      ))}

      {hasHalfStar && <BsStarHalf fill="orange" stroke="none" />}

      {Array.from({ length: emptyStars }, (_, index) => (
        <BsStar key={`empty-${index}`} fill="gray" stroke="none" />
      ))}
      <Text>({totalReviews})</Text>
    </Box>
  );
};
