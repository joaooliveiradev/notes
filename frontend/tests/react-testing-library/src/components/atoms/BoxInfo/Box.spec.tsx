import React from "react";
import { render, screen } from "@testing-library/react";
import { BoxInfo } from "./BoxInfo";
import exp from "constants";

const props = {
  content: "Box Content",
  title: "Box Title",
};

describe("<BoxInfo />", () => {
  it("should be rendering the title and the content of the <BoxInfo /> component", () => {
    render(<BoxInfo {...props} />);
    const title = screen.getByText(/box title/i);
    const content = screen.getByText(/box content/i);
    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
  });

  it("should be title and content rendering the text correctly", () => {
    render(<BoxInfo {...props} />);
    const title = screen.getByText(/box title/i);
    const content = screen.getByText(/box content/i);

    expect(title).toHaveTextContent("Box Title");
    expect(content).toHaveTextContent("Box Content");
  });
});
