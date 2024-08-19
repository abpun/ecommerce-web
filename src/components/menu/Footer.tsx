import Text from '../common/Text';
import Box from '../common/BoxLayout';
import Grid from '../common/GridLayout';
import Container from '../common/Container';
import IconInput from '../forms/IconInput';
import { SendHorizonal } from 'lucide-react';

export default function Footer() {
  return (
    <Container className="p-0 py-10 bg-black text-white">
      <Grid itemsPerRow={5} className="px-40 mx-auto items-start grid-cols-5 max-w-[1600px]">
        <Box className="flex-col items-start gap-4 w-full">
          <Text type="h2" className="text-2xl font-semibold">
            Exclusive
          </Text>
          <Text className="text-lg">Subscribe</Text>
          <Text>Get 10% off your first order</Text>
          <IconInput>
            <SendHorizonal />
          </IconInput>
        </Box>

        <Box className="flex-col items-start gap-4 w-full">
          <Text type="h3" className="text-xl">
            Support
          </Text>
          <Text>Kalikanagar-08, Butwal, Nepal.</Text>
          <Text>exclusive@email.com</Text>
          <Text>+977 9860000000</Text>
        </Box>

        <Box className="flex-col items-start gap-4 w-fit">
          <Text type="h3" className="text-xl">
            Account
          </Text>
          <Text>My Account</Text>
          <Text>Login / Register</Text>
          <Text>Cart</Text>
          <Text>Wishlist</Text>
          <Text>Shop</Text>
        </Box>

        <Box className="flex-col items-start gap-4 w-fit">
          <Text type="h3" className="text-xl">
            Quick Link
          </Text>
          <Text>Privacy Policy</Text>
          <Text>Terms of Use</Text>
          <Text>FAQ</Text>
          <Text>Contact</Text>
        </Box>
      </Grid>
    </Container>
  );
}
