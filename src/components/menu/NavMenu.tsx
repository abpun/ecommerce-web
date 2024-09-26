import React from 'react';
import Link from 'next/link';
import SignupBtn from '../actions/SignupBtn';
import { NavigationMenuList, navigationMenuTriggerStyle } from '../ui/navigation-menu';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink } from '@radix-ui/react-navigation-menu';

export default function NavMenu() {
  return (
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

        <SignupBtn />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
