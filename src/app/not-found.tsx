import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-6xl font-semibold">404 Not Found</h1>
      <p>Your visited page not found. You may go home page.</p>
      <Link href="/">
        <Button type="button">Back to home page</Button>
      </Link>
    </div>
  );
}
