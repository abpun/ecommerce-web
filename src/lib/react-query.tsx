'use client';

import { QueryClient, QueryClientProvider, hydrate } from '@tanstack/react-query';
import { useState, ReactNode } from 'react';

interface ReactQueryProviderProps {
  children: ReactNode;
  dehydratedState?: unknown;
}

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
