import { cn } from '@/lib/utils';
import React from 'react';

type TextProps = {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export default function Text({ type = 'p', children, className, ...rest }: TextProps) {
  const Tag = type;

  return (
    <Tag className={cn(className)} {...rest}>
      {children}
    </Tag>
  );
}
