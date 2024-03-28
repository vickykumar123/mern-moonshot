"use client";

import {useState} from "react";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {trpc} from "@/trpc/client";
import {getFetch, httpBatchLink, loggerLink} from "@trpc/client";
import superjson from "superjson";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const Providers = ({children}: {children: React.ReactNode}) => {
  const [queryClient] = useState(() => new QueryClient());
  const url = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000/api/trpc/";
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url,
          fetch: async (input, init?) => {
            const fetch = getFetch();
            return fetch(input, {
              ...init,
              credentials: "include",
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
              },
            });
          },
        }),
      ],
      //   transformer: superjson,
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
