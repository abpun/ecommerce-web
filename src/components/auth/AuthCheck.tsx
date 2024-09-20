'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthCheck = () => {
  const router = useRouter();
  const isLoggedIn = localStorage.getItem('isLoggedIn');

  useEffect(() => {
    if (isLoggedIn) {
      router.push('/app');
    } else {
      router.push('/auth/signin');
    }
  }, [router]);

  return <main>Loading...</main>;
};

export default AuthCheck;
