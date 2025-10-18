import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import Applications from "./Applications";
import Header from "./Header";

const queryClient = new QueryClient({});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Header />
        <Applications />
      </QueryClientProvider>
    </div>
  );
}

export default App;
