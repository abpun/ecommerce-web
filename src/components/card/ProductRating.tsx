import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import Box from '../common/BoxLayout';
import Text from '../common/Text';

export const ProductRating = ({
  rating,
  totalReviews,
  showCount = true,
}: {
  rating: any;
  totalReviews: number;
  showCount?: boolean;
}) => {
  const fullStars = Math.floor(parseFloat(rating));
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Box className="gap-1 justify-start">
      {Array.from({ length: fullStars }, (_, index) => (
        <BsStarFill key={`full-${index}`} fill="orange" stroke="none" />
      ))}

      {hasHalfStar && <BsStarHalf fill="orange" stroke="none" />}

      {Array.from({ length: emptyStars }, (_, index) => (
        <BsStar key={`empty-${index}`} fill="gray" stroke="none" />
      ))}
      {showCount && <Text>({totalReviews})</Text>}
    </Box>
  );
};
