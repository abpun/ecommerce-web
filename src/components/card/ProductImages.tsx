'use client';
import React from 'react';
import Image from 'next/image';
import Box from '../common/BoxLayout';
import { cn } from '@/lib/utils';

export default function ProductImages({ images }: any) {
  const [activeImage, setActiveImage] = React.useState<string>(images[0] || '');

  return (
    <Box className="w-3/5 items-center justify-start">
      <Box className="flex-col gap-5">
        {!images && images.length === 0 ? (
          <p>No images</p>
        ) : (
          <>
            {images.map((item: string, index: number) => (
              <Box
                key={index}
                onClick={() => setActiveImage(item)}
                className={cn('cursor-pointer', activeImage === item && 'shadow-[0_0_10px_rgba(0,0,0,0.1)]')}
              >
                <Image src={item} width={80} height={30} alt="thumbnail" />
              </Box>
            ))}
          </>
        )}
      </Box>
      <Image src={activeImage} width={440} height={200} alt="product" />
    </Box>
  );
}
