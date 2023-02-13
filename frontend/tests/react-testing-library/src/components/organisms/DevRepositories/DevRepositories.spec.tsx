import { useSelectorPage } from "@/hooks/useSelectorPage";
import { useSelectorUser } from "@/hooks/useSelectorUser";
import { useAppDispatch } from "@/lib/test-utils";
import { useRepositories } from "@/services/Users/hooks/useData";
import { changePage, gitSlice } from "@/store/GitHubUser/gitUserSlice";
import store from "@/store/GitHubUser/store";
import { screen, render, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { Provider } from "react-redux";
import { DevRepositories } from "./DevRepositories";

function waitForMs(ms: number) {
  const end = Date.now() + ms;
  return waitFor(() => {
    if (Date.now() < end) {
      throw new Error("Time not elapsed yet");
    }
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderSetup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <DevRepositories />
      </Provider>
    </QueryClientProvider>
  );

const reactQueryWrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>{children}</Provider>
  </QueryClientProvider>
);

jest.mock("@/lib/test-utils", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => gitSlice.getInitialState(),
}));

// This is to mute the network errors from test react query functions, i use the fucntion setLogger because the project is using the react-query v3
// In the react query v4 we can configure the logger directly on the options of the new queryClient({})
beforeAll(() => {
  setLogger({
    log: () => {},
    warn: () => {},
    error: () => {},
  });
});

describe("<DevRepositories />", () => {
  it("should be rendering", async () => {
    renderSetup();
    const gridElement = screen.getByTestId("repos");
    expect(gridElement).toBeInTheDocument();
  });
  it("should called dispatch", async () => {
    renderSetup();
    const dispatch = useAppDispatch();
    const defaultCount = 6;
    dispatch(changePage({ perPage: defaultCount, page: 1 }));
    expect(dispatch).toHaveBeenCalled();
  });
  it("should show a list of repositories", async () => {
    renderSetup();
    const spinner = screen.getByTestId("spinner");
    const { page, perPage } = useSelectorPage();
    const user = useSelectorUser();
    const { result } = renderHook(() => useRepositories(user, page, perPage), {
      wrapper: reactQueryWrapper,
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
      expect(spinner).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(spinner).not.toBeInTheDocument();
    });
  });
});
