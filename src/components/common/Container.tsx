import { cn } from '@/lib/utils';

export default function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('px-40 py-5', className)}>{children}</div>;
}
