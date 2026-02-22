import { ClerkProvider } from '@clerk/clerk-expo';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import '../global.css'
import * as Sentry from '@sentry/react-native'
import {MutationCache, QueryCache} from "@tanstack/query-core";

Sentry.init({
    dsn: "https://d0bf3175033ebbb645c3afcb26d95d8b@o4510920177418240.ingest.de.sentry.io/4510920178925648",
    integrations: [
        Sentry.mobileReplayIntegration(),
    ],
    sendDefaultPii: true,
    enableLogs: true,
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
});

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error: any, query) => {
            Sentry.captureException(error, {
                tags: {
                    type: 'react-query-error',
                    queryKey: query.queryKey[0]?.toString() || "unknown",
                },
                extra: {
                    errorMessage: error.message,
                    statusCode: error.response?.status,
                    queryKey: query.queryKey,
                },
            });
        },
    }),
    mutationCache: new MutationCache({
        onError: (error: any) => {
            Sentry.captureException(error, {
                tags: {
                    type: 'react-query-mutation-error',
                },
                extra: {
                    errorMessage: error.message,
                    statusCode: error.response?.status,
                },
            });
        },
    }),
});

export default Sentry.wrap(function RootLayout() {

  return (
    <ClerkProvider tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryClientProvider>
    </ClerkProvider>
  );
});
