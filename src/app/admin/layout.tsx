'use client';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import authService from '@/lib/authService';
import React from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  React.useEffect(() => {
    const checkAuth = async () => {
      if (!authService.isAuthenticated()) return;
    };

    checkAuth();
  }, []);

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
