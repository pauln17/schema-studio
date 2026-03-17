import type { AppProps } from "next/app";
import { Nunito } from "next/font/google";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { queryPersister } from "@/lib/query-persister";
import "@/styles/globals.css";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-nunito",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: queryPersister }}>
      <main className={nunito.className}>
        <Component {...pageProps} />
      </main>
    </PersistQueryClientProvider>
  );
}
