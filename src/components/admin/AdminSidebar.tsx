import { Separator } from '@radix-ui/react-separator';
import Link from 'next/link';
import React from 'react';

const AdminSidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4">
        <h2 className="text-lg font-bold">Admin Panel</h2>
      </div>
      <Separator className="w-full h-[1px] bg-gray-300" />
      <ul className="mt-4">
        <li>
          <Link href="/admin/products" className="block p-4 hover:bg-gray-200">
            Products
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="block p-4 hover:bg-gray-200">
            Orders
          </Link>
        </li>
        <li>
          <Link href="/admin/users" className="block p-4 hover:bg-gray-200">
            Users
          </Link>
        </li>
      </ul>
      <Separator className="w-[80%] mx-auto my-10 h-[1px] bg-gray-300" />
      <ul className="mt-4 text-sm">
        <li>
          <Link href="/admin/products" className="block p-4 hover:bg-gray-200">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/admin/orders" className="block p-4 hover:bg-gray-200">
            Recommendation
          </Link>
        </li>
        <li>
          <Link href="/admin/users" className="block p-4 hover:bg-gray-200">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
