import { useSelectorPage, useSelectorUser } from "@/hooks/";
import { useRepositories } from "@/services/Users/hooks/useData";
import { changePage, gitSlice } from "@/store/GitHubUser/gitUserSlice";
import { screen, renderHook, waitFor, render } from "@testing-library/react";
import { server, useAppDispatch } from "@/lib/test-utils";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { Provider } from "react-redux";
import store from "@/store/GitHubUser/store";
import { DevRepositories } from "./DevRepositories";

jest.mock("@/lib/test-utils", () => {
  const actualModule = jest.requireActual("@/lib/test-utils");
  return {
    ...actualModule,
    useAppDispatch: () => jest.fn(),
    useAppSelector: () => gitSlice.getInitialState(),
  };
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});


const reactQueryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};

const renderSetup = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <DevRepositories />
      </Provider>
    </QueryClientProvider>
);

describe("<DevRepositories />", () => {
  beforeAll(() =>
    setLogger({
      log: () => {},
      warn: () => {},
      error: () => {},
    })
  );

  afterEach(() => server.resetHandlers());

  afterAll(() => server.close());

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
  it("should loading work properly", async () => {
    renderSetup();
    const spinner = screen.getByTestId("spinner");

    const { page, perPage } = useSelectorPage();
    const name = useSelectorUser();

    const { result } = renderHook(() => useRepositories(name, page, perPage), {
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

  it("success call useRepositories hook", async () => {
    const { page, perPage } = useSelectorPage();

    const name = useSelectorUser();

    const { result } = renderHook(() => useRepositories(name, page, perPage), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
    });
  });
  it("should fail the useRepositores hook", async () => {
    //to msw server listen requests and return 500 to fail the useRepositories hook
    server.listen();

    const { page, perPage } = useSelectorPage();

    const name = useSelectorUser();

    const { result } = renderHook(() => useRepositories(name, page, perPage), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
    });
  });
});
