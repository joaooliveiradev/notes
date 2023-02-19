import { useSelectorPage } from "@/hooks/useSelectorPage";
import { useSelectorUser } from "@/hooks/useSelectorUser";
import { useRepositories } from "@/services/Users/hooks/useData";
import { changePage, gitSlice } from "@/store/GitHubUser/gitUserSlice";
import { screen, renderHook, waitFor } from "@testing-library/react";
import { server, useAppDispatch } from "@/lib/test-utils";
import { reactQueryWrapper, renderSetup } from "@/lib/testWrappers";
import { setLogger } from "react-query";
import { rest } from "msw";

jest.mock("@/lib/test-utils", () => {
  const actualModule = jest.requireActual("@/lib/test-utils");
  return {
    ...actualModule,
    useAppDispatch: () => jest.fn(),
    useAppSelector: () => gitSlice.getInitialState(),
  };
});

describe("<DevRepositories />", () => {
  beforeAll(() =>
    setLogger({
      log: () => {},
      warn: () => {},
      error: () => {},
    })
  );

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

  it("success call useRepositories hook", async () => {
    const { page, perPage } = useSelectorPage();

    const user = useSelectorUser();

    const { result } = renderHook(() => useRepositories(user, page, perPage), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
    });
  });
  it("should fail the useRepositores hook", async () => {
    server.listen();

    const { page, perPage } = useSelectorPage();

    const user = useSelectorUser();

    const { result } = renderHook(() => useRepositories(user, page, perPage), {
      wrapper: reactQueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
      expect(result.current.isError).toBe(true);
    });
  });
});
