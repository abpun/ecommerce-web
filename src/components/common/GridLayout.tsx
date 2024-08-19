import { cn } from '@/lib/utils';
import React from 'react';

type GridProps = {
  itemsPerRow: number;
  children: React.ReactNode;
  className?: string;
};

const Grid: React.FC<GridProps> = ({ itemsPerRow, children, className }) => {
  const gridColsClass = `grid-cols-${Math.min(Math.max(itemsPerRow, 1), 12)}`;

  return <div className={cn('grid gap-12 grid-cols-4', gridColsClass, className)}>{children}</div>;
};

export default Grid;
