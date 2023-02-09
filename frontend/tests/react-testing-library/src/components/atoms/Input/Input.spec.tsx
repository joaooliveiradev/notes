import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputCustom } from "./index";

const renderSetup = () => render(<InputCustom />);

describe("<InputCustom />", () => {
  it("should be rendering", () => {
    renderSetup();
    const element = screen.getByRole("textbox");
    expect(element).toBeInTheDocument();
  });
  it("should allow the value on the input", async () => {
    renderSetup();
    const user = userEvent.setup();
    const element = screen.getByRole("textbox");
    await user.type(element, "someGithubProfile");
    expect(element).toHaveValue("someGithubProfile");
  });
  it("should render with the correct props", () => {
    render(
      <InputCustom placeholder="Github User" name="searchUser" type="text" />
    );
    const element = screen.getByRole("textbox");
    expect(element).toHaveAttribute("placeholder", "Github User");
    expect(element).toHaveAttribute("name", "searchUser");
    expect(element).toHaveAttribute("type", "text");
  });
  it("should focus correctly on the input", async () => {
    renderSetup();
    const user = userEvent.setup();
    const element = screen.getByRole("textbox");
    await user.tab();
    expect(element).toHaveFocus();
  });
});
