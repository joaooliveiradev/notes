import { DevRepositories } from "@/components/organisms/DevRepositories";
import store from "@/store/GitHubUser/store";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export const renderSetup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <DevRepositories />
      </Provider>
    </QueryClientProvider>
  );

export const reactQueryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};
