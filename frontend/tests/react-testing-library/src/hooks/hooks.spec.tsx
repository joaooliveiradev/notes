import { gitSlice } from "@/store/GitHubUser/gitUserSlice";
import store from "@/store/GitHubUser/store";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useSelectorPage, useSelectorUser } from "./index";

const reduxWraper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);

const initialState = gitSlice.getInitialState();

test("useSelectorUser return the correct initial values", () => {
  const { result } = renderHook(() => useSelectorUser(), {
    wrapper: reduxWraper,
  });

  const initialName = initialState.name;
  expect(result.current).toBe(initialName);
});
test("useSelectorPage return the correct initial values", () => {
  const { result } = renderHook(() => useSelectorPage(), {
    wrapper: reduxWraper,
  });

  const initialPage = initialState.page;
  const initialPerPage = initialState.perPage;

  expect(result.current.page).toBe(initialPage);
  expect(result.current.perPage).toBe(initialPerPage);
});
