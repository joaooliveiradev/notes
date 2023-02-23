import { useSelectorUser } from "@/hooks";
import {
  reactQueryWrapper,
  reduxWrapper,
  renderWithClient,
} from "@/lib/test-utils";
import { useUser } from "@/services/Users/hooks/useData";
import { screen, renderHook, waitFor } from "@testing-library/react";
import { IndexPage } from "./IndexPage";

describe("<IndexPage />", () => {
  it("should have success in every hook and display all the elements", async () => {
    renderWithClient(<IndexPage />);

    const loading = screen.getByText("Loading...");
    const { result } = renderHook(() => useSelectorUser(), {
      wrapper: reduxWrapper,
    });

    const { result: useUserResult } = renderHook(
      () => useUser(result.current),
      {
        wrapper: reactQueryWrapper,
      }
    );

    await waitFor(() => {
      expect(useUserResult.current.isLoading).toBe(true);
      expect(useUserResult.current.isError).toBe(false);
      expect(loading).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(useUserResult.current.isLoading).toBe(false);
      expect(useUserResult.current.isSuccess).toBe(true);
      const contentElement = screen.getByTestId("indexPageWrapper");
      expect(contentElement).toBeInTheDocument();
    });
  });
});
