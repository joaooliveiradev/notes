import React from "react";
import { render, screen } from "@testing-library/react";
import { BoxInfo } from "./BoxInfo";

describe("BoxInfo", () => {
  it("should be rendering", () => {
    render(<BoxInfo content="test" title="test" />);

    const element = screen.getByRole("div");

    expect(element).toBeInTheDocument
  });
});

test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});
