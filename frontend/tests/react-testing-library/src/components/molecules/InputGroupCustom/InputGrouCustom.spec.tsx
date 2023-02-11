import { fireEvent, render, screen } from "@testing-library/react";
import { InputGroupCustom } from "./InputGroupCustom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "@/store/GitHubUser/store";
import userEvent from "@testing-library/user-event";

const renderSetup = () => {
  render(
    <Provider store={store}>
      <InputGroupCustom />
    </Provider>
  );
};

type User = {
  gitUser: {
    name: string;
  };
};

describe("<InputGroupCustom />", () => {
  it("should render the form", () => {
    renderSetup();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    const form = input.closest("form");
    expect(form).toBeInTheDocument();
  });
  it("should submit", async () => {
    renderSetup();
    const input = screen.getByRole("textbox");
    const button = screen.getByRole("button");
    const form = screen.getByTestId("form");

    userEvent.type(input, "vmarcossp");

    fireEvent.click(button);


    expect(form.onsubmit).toHaveBeenCalled()
  });
});
