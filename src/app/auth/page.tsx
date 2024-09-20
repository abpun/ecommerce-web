'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem('ecom_user');
    if (!user) router.push('/auth/signup');
  }, []);

  return <div className="absolute top-0 left-0 h-screen w-screen bg-white">Your content here</div>;
}
