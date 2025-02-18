import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: (attemptIndex) =>
        Math.pow(2, attemptIndex) * 3000 + Math.random() * 1000,
      retry: (failureCount, err: any) => {
        if (
          err.response &&
          (err.response.status < 200 || err.response.status >= 300)
        ) {
          return false;
        }
        const defaultRetry = 3;
        return Number.isSafeInteger(defaultRetry)
          ? failureCount < (defaultRetry ?? 0)
          : false;
      },
      refetchOnWindowFocus: true,
    },
  },
});
