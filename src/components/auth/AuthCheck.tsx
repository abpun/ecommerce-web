'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/lib/authService';

const AuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = () => {
      const loggedIn = authService.isAuthenticated();
      if (loggedIn) {
        router.push('/home');
      } else {
        router.push('/auth/signin');
      }
    };

    checkAuthStatus();
  }, []);

  return <main>Loading...</main>;
};

export default AuthCheck;
