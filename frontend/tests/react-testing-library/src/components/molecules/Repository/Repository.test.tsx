import { screen, render } from "@testing-library/react";
import { Repository } from "./Repository";
import userEvent from "@testing-library/user-event";
import { m } from "framer-motion";

const html_url = "https://github.com/joaooliveiradev";

const mockProps = {
  description: "mockDescription",
  name: "mockName",
  html_url: "https://github.com/joaooliveiradev",
  language: "mockLang",
};

const renderSetup = () => render(<Repository {...mockProps} />);

describe("<Repository />", () => {
  it("should be rendering", () => {
    renderSetup();
    const box = screen.getByTestId("repositoryWrapper");
    expect(box).toBeInTheDocument();
  });
  it("should open a link if html_url is passed", async () => {
    renderSetup();
    const box = screen.getByTestId("repositoryWrapper");
    const user = userEvent.setup();

    window.open = jest.fn();

    await user.click(box);

    expect(window.open).toHaveBeenCalledWith(mockProps.html_url);
  });
  it("should render 'Sem descrição' if not pass description prop ", () => {
    render(
      <Repository
        html_url={mockProps.html_url}
        language={mockProps.language}
        name={mockProps.name}
      />
    );
    const descriptionText = screen.getByText(/Sem Descrição./i);
    expect(descriptionText).toBeInTheDocument();
  });
});
