import { cn } from '@/lib/utils';
import React from 'react';

type GridProps = {
  itemsPerRow: number;
  children: React.ReactNode;
};

const Grid: React.FC<GridProps> = ({ itemsPerRow, children }) => {
  const gridColsClass = `grid-cols-${Math.min(Math.max(itemsPerRow, 1), 12)}`;

  return <div className={cn('grid gap-8', gridColsClass)}>{children}</div>;
};

export default Grid;
