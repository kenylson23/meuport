import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Portfolio from "./components/Portfolio";
import TetrisLoading from "./components/ui/TetrisLoading";
import "./index.css";
import "./styles/neon.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-black">
          <TetrisLoading size="md" speed="normal" loadingText="Carregando Portfólio..." />
        </div>
      }>
        <Portfolio />
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
