'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/lib/authService';
import { ThreeDots } from 'react-loader-spinner';

const AuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = () => {
      const loggedIn = authService.isAuthenticated();
      if (authService.getUser()?.role === 'admin' && loggedIn) {
        router.push('/admin/products');
      } else {
        router.push('/admin/login');
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </main>
  );
};

export default AuthCheck;
