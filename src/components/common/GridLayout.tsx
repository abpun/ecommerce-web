import { cn } from '@/lib/utils';
import React, { HTMLAttributes } from 'react';

type GridProps = {
  itemsPerRow: number;
  children: React.ReactNode;
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const Grid: React.FC<GridProps> = ({ itemsPerRow, children, className, ...props }) => {
  const gridColsClass = `grid-cols-${Math.min(Math.max(itemsPerRow, 1), 12)}`;

  return (
    <div {...props} className={cn('grid gap-12 grid-cols-4', gridColsClass, className)}>
      {children}
    </div>
  );
};

export default Grid;
