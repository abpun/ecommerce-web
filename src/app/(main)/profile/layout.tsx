'use client';
import React from 'react';
import Link from 'next/link';
import Text from '@/components/common/Text';
import authService from '@/lib/authService';
import Box from '@/components/common/BoxLayout';
import Container from '@/components/common/Container';
import CustomBreadcrumb from '@/components/common/Breadcrumb';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

const MENUS = [
  {
    name: 'My Account',
    href: '/profile',
  },
  {
    name: 'My Orders',
    href: '/profile/orders',
  },
  {
    name: 'My Wishlist',
    href: '/profile/wishlist',
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMounted, setIsMounted] = React.useState(false);
  const params = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    authService.logout();
    router.push('/');
  };

  if (!isMounted) return <div className=""></div>;

  return (
    <>
      <Container className="mt-2">
        <Box className="justify-between">
          <CustomBreadcrumb items={[{ name: 'Home', href: '/' }, { name: 'My Account' }]} />
          <Box className="gap-2">
            <Text>Welcome!</Text>
            <Text className="text-primary">{authService.getUser()?.name}</Text>
          </Box>
        </Box>

        <Box className="w-full justify-start h-[40vh] items-start gap-12 mt-12 px-20">
          <Box className="w-[200px] justify-start">
            <ul className="space-y-8">
              {MENUS.map(menu => (
                <li key={menu.name} className="font-semibold">
                  <Link
                    href={menu.href}
                    className={cn('cursor-pointer', params === menu.href ? 'text-primary' : 'text-gray-600')}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
              <Button type="button" className="w-24" onClick={handleLogout}>
                Logout
              </Button>
            </ul>
          </Box>
          <div className="w-3/4">{children}</div>
        </Box>
      </Container>
    </>
  );
}
