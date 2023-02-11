import { render, screen } from "@testing-library/react";
import { InputGroupCustom } from "./InputGroupCustom";
import { Provider } from "react-redux";
import store from "@/store/GitHubUser/store";
import { changeUser } from "@/store/GitHubUser/gitUserSlice";

const renderSetup = () => {
  render(
    <Provider store={store}>
      <InputGroupCustom />
    </Provider>
  );
};

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
    const someUser = "vmarcossp";
    store.dispatch(changeUser(someUser));
    const state = store.getState();
    expect(state.gitUser.name).toBe(someUser);
  });
});
