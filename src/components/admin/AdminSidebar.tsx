'use client';
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { usePathname } from 'next/navigation';
import { Separator } from '@radix-ui/react-separator';
import { cn } from '@/lib/utils';

const AdminSidebar: React.FC = () => {
  const params = usePathname();

  const menuItems = [
    { href: '/admin/products', label: 'Products' },
    { href: '/admin/orders', label: 'Orders' },
    { href: '/admin/users', label: 'Users' },
  ];

  const profileItems = [
    { href: '/admin/profile', label: 'Profile' },
    { href: '/admin/recommendation', label: 'Recommendation' },
  ];

  return (
    <div className="!min-w-64 h-screen bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </div>
      <Separator className="w-full h-[1px] bg-gray-300" />

      <ul className="mt-4">
        {menuItems.map(item => (
          <li key={item.href} className={cn('hover:bg-gray-200', params === item.href && '!bg-blue-500 text-white')}>
            <Link href={item.href} className="block p-4">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <Separator className="w-[80%] mx-auto my-10 h-[1px] bg-gray-300" />

      <ul className="mt-4 text-sm">
        {profileItems.map(item => (
          <li key={item.href} className={cn('hover:bg-gray-200', params === item.href && '!bg-blue-500 text-white')}>
            <Link href={item.href} className="block p-4">
              {item.label}
            </Link>
          </li>
        ))}
        <li className="mx-2 mt-4">
          <Button size="sm">Logout</Button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
