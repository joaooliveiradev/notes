import { render, screen } from "@testing-library/react";
import { InputGroupCustom } from "./InputGroupCustom";
import { Provider } from "react-redux";
import store from "@/store/GitHubUser/store";
import { changeUser, gitSlice } from "@/store/GitHubUser/gitUserSlice";
import { useAppDispatch } from "@/lib/test-utils";

const renderSetup = () => {
  render(
    <Provider store={store}>
      <InputGroupCustom />
    </Provider>
  );
};

jest.mock("@/lib/test-utils", () => ({
  useAppDispatch: () => jest.fn(),
  useAppSelector: () => gitSlice.getInitialState(),
}));

describe("<InputGroupCustom />", () => {
  it("should render the form", () => {
    renderSetup();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const form = screen.getByTestId("form");
    expect(form).toBeInTheDocument();
  });
  it("simulate an submit action on the component ", async () => {
    renderSetup();
    const dispatch = useAppDispatch();
    const mockUser = "vmarcossp"
    dispatch(changeUser(mockUser));
    expect(dispatch).toHaveBeenCalled()
  });
});
