import { cn } from '@/lib/utils';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>navbar</div>
      {children}
      <div>footer</div>
    </div>
  );
}
