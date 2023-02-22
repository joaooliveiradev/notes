import { DevRepositories } from "./DevRepositories";
import { useSelectorPage, useSelectorUser } from "@/hooks/";
import { useRepositories } from "@/services/Users/hooks/useData";
import { changePage } from "@/store/GitHubUser/gitUserSlice";
import { screen, renderHook, waitFor } from "@testing-library/react";
import {
  reactQueryWrapper,
  reduxWrapper,
  renderWithClient,
  server,
  useAppDispatch,
} from "@/lib/test-utils";

jest.mock("@/lib/test-utils", () => {
  const actualModule = jest.requireActual("@/lib/test-utils");
  return {
    ...actualModule,
    useAppDispatch: () => jest.fn(),
  };
});

describe("<DevRepositories />", () => {
  it("should called dispatch", async () => {
    renderWithClient(<DevRepositories />);
    const dispatch = useAppDispatch();
    const defaultCount = 6;
    dispatch(changePage({ perPage: defaultCount, page: 1 }));
    expect(dispatch).toHaveBeenCalled();
  });
  it("should loading work properly", async () => {
    renderWithClient(<DevRepositories />);
    const spinner = screen.getByTestId("spinner");

    const { result: pages } = renderHook(() => useSelectorPage(), {
      wrapper: reduxWrapper,
    });

    const { result: user } = renderHook(() => useSelectorUser(), {
      wrapper: reduxWrapper,
    });

    const { result } = renderHook(
      () =>
        useRepositories(
          user.current,
          pages.current.page,
          pages.current.perPage
        ),
      {
        wrapper: reactQueryWrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(true);
      expect(spinner).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(spinner).not.toBeInTheDocument();
    });
  });
  it("should display repos on the UI after useRepositories success", async () => {
    renderWithClient(<DevRepositories />);

    const { result: pages } = renderHook(() => useSelectorPage(), {
      wrapper: reduxWrapper,
    });

    const { result: user } = renderHook(() => useSelectorUser(), {
      wrapper: reduxWrapper,
    });

    const { result } = renderHook(
      () =>
        useRepositories(
          user.current,
          pages.current.page,
          pages.current.perPage
        ),
      {
        wrapper: reactQueryWrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });

    const resultRepos = result.current.data
      ? result.current.data.map((repo) => repo.name)
      : [];

    await waitFor(() => {
      const screenRepos = screen
        .getAllByTestId("repositoryText")
        .map((p) => p.textContent);
      expect(resultRepos).toEqual(screenRepos);
    });
  });
  it("should fail the useRepositores hook", async () => {
    // start msw server to intercept requests and return 500 to fail the useRepositories hook
    server.listen();

    const { result: pages } = renderHook(() => useSelectorPage(), {
      wrapper: reduxWrapper,
    });

    const { result: user } = renderHook(() => useSelectorUser(), {
      wrapper: reduxWrapper,
    });

    const { result } = renderHook(
      () =>
        useRepositories(
          user.current,
          pages.current.page,
          pages.current.perPage
        ),
      {
        wrapper: reactQueryWrapper,
      }
    );

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
    });
  });
});
