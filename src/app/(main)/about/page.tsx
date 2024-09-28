import Box from '@/components/common/BoxLayout';
import Container from '@/components/common/Container';
import Grid from '@/components/common/GridLayout';
import Text from '@/components/common/Text';
import React from 'react';

export default function page() {
  return (
    <Container>
      <Grid itemsPerRow={2}>
        <Box className="flex-col gap-4 items-start">
          <Text className="text-3xl font-semibold">Our Story</Text>
          <Text>
            Launced in 2015, Exclusive is South Asia's premier online shopping makterplace with an active presense in
            Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500
            sallers and 300 brands and serves 3 millioons customers across the region.
          </Text>
          <Text>
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse
            assotment in categories ranging from consumer.
          </Text>
        </Box>
      </Grid>
    </Container>
  );
}
