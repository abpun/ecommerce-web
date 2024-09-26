'use client';
import React from 'react';
import ApiService from '@/lib/apiService';
import { useSearchParams } from 'next/navigation';
import { PAYMENT } from '@/constants/endpoints';
import Container from '@/components/common/Container';
import Text from '@/components/common/Text';
import Box from '@/components/common/BoxLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function page() {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());

  const [status, setStatus] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkStatus = async () => {
      if (params.status === 'Completed') {
        const res = await ApiService.patch(PAYMENT.UPDATE(params.purchase_order_id), {
          pidx: params.pidx,
          tidx: params.tidx,
        });

        if (res.status === 200) {
          setStatus(true);
        }
      }
      setLoading(false);
    };

    checkStatus();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box className="h-[40vh]">
          <Text>Checking payment status</Text>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box className="h-[40vh] flex-col gap-8">
        <Text className="text-5xl">{status ? 'Success' : 'Failed'}</Text>
        <Link href="/">
          <Button>Goto Home Page</Button>
        </Link>
      </Box>
    </Container>
  );
}
