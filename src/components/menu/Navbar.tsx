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
import { useForm } from 'react-hook-form';
import ApiService from '@/lib/apiService';
import { PRODUCT } from '@/constants/endpoints';

export default function Navbar() {
  const form = useForm({
    defaultValues: {
      searchText: '',
    },
  });
  const router = useRouter();
  const searchText = form.watch('searchText');
  const ref = React.useRef<HTMLDivElement>(null);
  const [results, setResults] = React.useState<any>([]);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isFocusing, setIsFocusing] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!isMounted || searchText === '') return;
    const fetchSearch = async () => {
      try {
        const response = await ApiService.get(PRODUCT.SEARCH(searchText));
        if (response.statusCode === 404) return setResults([]);
        setResults(response);
      } catch (error) {
        setResults([]);
        console.error('Error fetching search results:', error);
      }
    };

    fetchSearch();
  }, [searchText, isMounted]);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setResults([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onSearchItemClick = (id: string) => {
    form.reset();
    setResults([]);
    router.push(`/product/${id}`);
  };

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
          <Box className="gap-5 relative">
            <div ref={ref}>
              <IconInput
                placeholder="Search"
                isFocusing={isFocusing}
                setIsFocusing={setIsFocusing}
                {...form.register('searchText')}
                className="ring-offset-background bg-gray-100 w-80"
              >
                <SearchIcon />
              </IconInput>
              {searchText && (
                <div className="absolute top-full left-0 w-full bg-white border mt-3 rounded-lg p-2">
                  {!results || results.length === 0 ? (
                    <div className="text-gray-500 p-2">No results found</div>
                  ) : (
                    results?.map((result: any) => (
                      <div
                        key={result._id}
                        onClick={() => onSearchItemClick(result._id)}
                        className="cursor-pointer hover:bg-gray-100 p-2 rounded-md"
                      >
                        {result.title}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
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
