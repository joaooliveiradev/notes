import { render, screen } from "@testing-library/react";
import { BoxInfo } from "./BoxInfo";

const props = {
  content: "Box Content",
  title: "Box Title",
};

const renderSetup = () => render(<BoxInfo {...props} />);

describe("<BoxInfo />", () => {
  it("should be rendering the title and the content of the <BoxInfo /> component", () => {
    renderSetup();
    const title = screen.getByText(/box title/i);
    const content = screen.getByText(/box content/i);
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it("should be title and content rendering the text correctly", () => {
    renderSetup();
    const title = screen.getByText(/box title/i);
    const content = screen.getByText(/box content/i);

    expect(title).toHaveTextContent("Box Title");
    expect(content).toHaveTextContent("Box Content");
  });
});
