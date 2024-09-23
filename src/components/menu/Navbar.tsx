import { ChevronDown, HeartIcon, SearchIcon } from 'lucide-react';
import Box from '../common/BoxLayout';
import Container from '../common/Container';
import NavMenu from './NavMenu';
import NavSider from './NavSider';
import { Button } from '../ui/button';
import Text from '../common/Text';
import IconInput from '../forms/IconInput';
import CartButton from '../actions/CartButton';

export default function Navbar() {
  const isLoggedIn = false;

  return (
    <>
      <Container className="sticky bg-white border-b border-gray-300 top-0 z-50 mx-auto max-w-[1600px]">
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
                <CartButton />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </>
  );
}
