import { ChevronDown, HeartIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react';
import Box from '../common/BoxLayout';
import Container from '../common/Container';
import NavMenu from './NavMenu';
import NavSider from './NavSider';
import { Button } from '../ui/button';
import Text from '../common/Text';
import IconInput from '../forms/IconInput';

export default function Navbar() {
  const isLoggedIn = false;

  return (
    <>
      <Container className="sticky top-0 z-50 p-0 py-1 bg-black  text-white">
        <Box className="px-40 justify-end mx-auto max-w-[1600px] gap-80">
          <Box>
            <Text>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!</Text>
            <Button variant="link" className="text-white underline hover:no-underline">
              ShopNow
            </Button>
          </Box>
          <Box>
            <Text>English</Text>
            <ChevronDown />
          </Box>
        </Box>
      </Container>
      <Container className="mx-auto max-w-[1600px]">
        <Box className="justify-between">
          <Text type="h3">Exclusive</Text>
          <NavMenu />
          <Box className="gap-5">
            {/* <NavSider /> */}
            <IconInput className="ring-offset-background bg-gray-100 w-80">
              <SearchIcon />
            </IconInput>
            {!isLoggedIn && (
              <Box className="gap-5">
                <HeartIcon />
                <ShoppingCartIcon />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
