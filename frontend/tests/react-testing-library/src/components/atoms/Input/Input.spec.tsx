import { render, screen } from "@testing-library/react";
import { InputCustom } from "./index";

const renderSetup = () => render(<InputCustom placeholder="inputExample" />);

describe("<InputCustom />", () => {
  it("should be rendering", () => {
    renderSetup()
    const element = screen.getByPlaceholderText("inputExample");
    expect(element).toBeInTheDocument();
  });
});
