'use client';
import { cn } from '@/lib/utils';
import { forwardRef, useState } from 'react';
import { Input } from '../ui/input';
import Box from '../common/BoxLayout';

interface IconInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  className?: string;
  isFocusing: boolean;
  setIsFocusing: React.Dispatch<React.SetStateAction<boolean>>;
}

const IconInput = forwardRef<HTMLInputElement, IconInputProps>(
  ({ children, className, isFocusing, setIsFocusing, ...props }, ref) => {
    const onFocus = () => {
      setIsFocusing(true);
    };

    const onBlur = () => {
      setIsFocusing(false);
    };

    return (
      <Box
        className={cn(
          'border border-white rounded-md bg-transparent px-3 text-sm ring-offset-foreground placeholder:text-muted-foreground',
          isFocusing && 'outline-none ring-2 ring-ring ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
      >
        <Input
          {...props}
          ref={ref}
          onBlur={onBlur}
          onFocus={onFocus}
          className="bg-transparent p-0 border-none outline-none focus-visible:ring-offset-0 focus-visible:ring-0"
        />
        {children}
      </Box>
    );
  }
);

export default IconInput;
