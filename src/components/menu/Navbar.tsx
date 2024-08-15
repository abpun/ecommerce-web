import { ChevronDown, HeartIcon, ShoppingCartIcon } from 'lucide-react';
import Box from '../common/BoxLayout';
import Container from '../common/Container';
import NavMenu from './NavMenu';
import NavSider from './NavSider';
import { Button } from '../ui/button';
import Text from '../common/Text';

export default function Navbar() {
  const isLoggedIn = false;

  return (
    <>
      <Container className="p-0 py-1 bg-black text-white">
        <Box className="px-40 justify-end gap-80">
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
      <Container>
        <Box className="justify-between">
          <Text type="h3">Exclusive</Text>
          <NavMenu />
          <Box className="gap-5">
            <NavSider />
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
