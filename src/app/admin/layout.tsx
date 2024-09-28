'use client';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import authService from '@/lib/authService';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authService.isAuthenticated() || authService.getUser()?.role !== 'admin') {
        router.push('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  if (loading) {
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
  }

  if (pathname === '/admin/login') {
    return <div className="w-full flex justify-center">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1">
        <AdminHeader />
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
