import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error: unknown) => {
        // Don't retry for 404s or client errors (4xx)
        const status = (error as { status?: number })?.status;
        if (
          status === 404 ||
          (typeof status === 'number' && status >= 400 && status < 500) ||
          failureCount > 3
        )
          return false;
        return true;
      },
      retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
      staleTime: 1000 * 60 * 5,
    },
  },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
