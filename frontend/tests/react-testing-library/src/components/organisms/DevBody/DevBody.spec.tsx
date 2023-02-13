import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event"
import { DevBody } from "./DevBody";

const mockProps = {
  description: "mockDescription",
  name: "mockName",
  html_url: "https://github.com/joaooliveiradev",
  language: "mockLang",
  avatar_url: "https://avatars.githubusercontent.com/u/44060767?v=4",
  login: "mockName",
  bio: "mockBio",
  followers: "0",
  following: "0",
  public_repos: 0,
};

const renderSetup = () => render(<DevBody {...mockProps} />);
describe("<DevBody />", () => {
  it("should be rendering", () => {
    renderSetup();
    screen.logTestingPlaygroundURL();
    const element = screen.getByTestId("devBodyWrapper");
    expect(element).toBeInTheDocument();
  });
  it("should open a new tab on click in 'View on GitHub' ", async () => {
    renderSetup()
    const button = screen.getByRole('button', {name: /View on github/i})
    const user = userEvent.setup()
    window.open = jest.fn()
    await user.click(button)
    expect(window.open).toHaveBeenCalledWith(mockProps.html_url)
  });
});
