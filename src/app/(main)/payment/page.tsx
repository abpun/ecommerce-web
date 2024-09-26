'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function page() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  console.log('params', params);

  return <div>page</div>;
}
