'use client';
import React from 'react';
import Box from '../common/BoxLayout';
import Text from '../common/Text';
import { Separator } from '@radix-ui/react-separator';
import { CATEGORIES } from '@/constants/categories';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import '@/assets/css/splide.css';
import { IconType } from 'react-icons/lib';
import { useRouter } from 'next/navigation';

type CategoryType = {
  icon: IconType;
  label: string;
  category: string;
};

export default function ProductsByCategories() {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const scrollIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const scrollDistance = 200;
  const scrollSpeed = 100;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollDistance, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollDistance, behavior: 'smooth' });
    }
  };

  const startScrollingLeft = () => {
    scrollLeft();
    scrollIntervalRef.current = setInterval(scrollLeft, scrollSpeed);
  };

  const startScrollingRight = () => {
    scrollRight();
    scrollIntervalRef.current = setInterval(scrollRight, scrollSpeed);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  return (
    <>
      <Box className="justify-start gap-2">
        <div className="h-8 w-3 bg-primary rounded-sm"></div>
        <Text>Categories</Text>
      </Box>
      <Box className="justify-between mt-3">
        <Text className="text-2xl font-semibold">Browse By Category:</Text>
        <Box>
          <button
            onMouseDown={startScrollingLeft}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            aria-label="Scroll Left"
            className="p-2"
          >
            <ChevronLeft />
          </button>
          <button
            onMouseDown={startScrollingRight}
            onMouseUp={stopScrolling}
            onMouseLeave={stopScrolling}
            aria-label="Scroll Right"
            className="p-2"
          >
            <ChevronRight />
          </button>
        </Box>
      </Box>

      <div ref={scrollRef} className="flex mt-5 overflow-x-auto gap-5 scrollbar-hidden">
        {CATEGORIES.map((category: CategoryType, index) => (
          <Category key={index} category={category} />
        ))}
      </div>

      <Separator className="my-10 w-full h-[1px] bg-gray-300" />
    </>
  );
}

const Category = ({ category }: { category: CategoryType }) => {
  const router = useRouter();
  return (
    <Box
      onClick={() => router.push(`/product/category/${category.category}`)}
      className="min-w-32 h-32 border flex-col gap-4 cursor-pointer"
    >
      <div className="size-10 flex justify-center items-center">
        <category.icon size={36} className="text-gray-400" />
      </div>
      <p className="text-center text-sm">{category.label}</p>
    </Box>
  );
};
