'use client';
import { useState } from 'react';
import Box from '../common/BoxLayout';
import { Input } from '../ui/input';
import { SendHorizonal } from 'lucide-react';
import { cn } from '@/lib/utils';

const IconInput = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [isFocusing, setIsFocusing] = useState<boolean>(false);

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
        onBlur={onBlur}
        onFocus={onFocus}
        className="bg-transparent p-0 border-none outline-none focus-visible:ring-offset-0 focus-visible:ring-0"
        placeholder="Enter your email"
      />
      {/* <SendHorizonal /> */}
      {children}
    </Box>
  );
};

export default IconInput;
