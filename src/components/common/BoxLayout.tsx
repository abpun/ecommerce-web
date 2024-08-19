import { cn } from '@/lib/utils';

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export default function Box({ children, className, ...rest }: BoxProps) {
  return (
    <div className={cn('flex items-center justify-center', className)} {...rest}>
      {children}
    </div>
  );
}
