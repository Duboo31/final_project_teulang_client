import { QueryClient, QueryClientProvider } from "react-query";
import Router from "./shared/Router";
import "./styles/reset.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
