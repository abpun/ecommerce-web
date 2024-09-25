'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = Object.fromEntries(searchParams.entries());

  console.log('router', router);
  console.log('params', params);

  return <div>page</div>;
}
