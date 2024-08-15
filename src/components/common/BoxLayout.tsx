import { cn } from '@/lib/utils';

export default function Box({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex items-center justify-center', className)}>{children}</div>;
}
