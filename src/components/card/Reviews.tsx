import React from 'react';
import Text from '../common/Text';

export default function Reviews({ reviews }: any) {
  return (
    <div>
      <Text className="text-xl font-semibold">User Reviews: </Text>
      <div className="flex flex-col mt-5 gap-5">
        {reviews.map((review: any) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
}

const ReviewCard = ({ review }: any) => {
  return (
    <div className="border rounded-md p-4 shadow-sm w-[440px] flex items-start">
      <img
        src={`https://i.pravatar.cc/150?u=${review._id}`}
        alt={`${review.reviewerName}'s profile`}
        className="w-12 h-12 rounded-full mr-4"
      />
      <div className="w-full">
        <h3 className="text-lg font-semibold">{review.reviewerName}</h3>
        <div className="flex items-center">
          {Array.from({ length: 5 }, (_, index) => (
            <span key={index} className={index < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
        <p className="mt-2 text-gray-700">{review.comment}</p>
      </div>
    </div>
  );
};
