'use client';
import React from 'react';
import Link from 'next/link';
import Text from '../common/Text';
import Box from '../common/BoxLayout';
import IconInput from '../forms/IconInput';
import authService from '@/lib/authService';
import Container from '../common/Container';
import CartButton from '../actions/CartButton';

import { FiUser } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { HeartIcon, SearchIcon } from 'lucide-react';
import { NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@radix-ui/react-navigation-menu';

export default function Navbar() {
  const router = useRouter();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[83px] w-full bg-gray-100"></div>;

  return (
    <>
      <Container className="sticky bg-white border-b border-gray-300 top-0 z-50 mx-auto max-w-[1600px]">
        <Box className="justify-between">
          <Text type="h3">Exclusive</Text>
          <NavigationMenu orientation="horizontal">
            <NavigationMenuList>
              <NavigationMenuItem className="list-none">
                <Link href="/home" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem className="list-none">
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>Contact</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem className="list-none">
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>About</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {!authService.isAuthenticated() && (
                <NavigationMenuItem className="list-none">
                  <Link href="/auth/signup" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>Sign Up</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
          <Box className="gap-5">
            <IconInput className="ring-offset-background bg-gray-100 w-80">
              <SearchIcon />
            </IconInput>
            <Box className="gap-5">
              <HeartIcon />
              <CartButton />
              {authService.isAuthenticated() && (
                <div
                  onClick={() => router.push('/profile')}
                  className="size-7 cursor-pointer rounded-full flex justify-center items-center bg-primary "
                >
                  <FiUser className="text-white" />
                </div>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}
