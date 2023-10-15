import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-modern-drawer/dist/index.css";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <main className="bg-main p-10 min-h-[100vh] flex items-center justify-center">
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            success: {
              duration: 4000,
              style: { padding: "1rem" },
            },
            error: {
              duration: 4000,
              style: { padding: "1rem" },
            },
          }}
        />
      </main>
    </QueryClientProvider>
  );
}
