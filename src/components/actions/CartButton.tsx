'use client';
import { ShoppingCartIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CartButton() {
  const router = useRouter();
  return <ShoppingCartIcon className="cursor-pointer" onClick={() => router.push('/cart')} />;
}
