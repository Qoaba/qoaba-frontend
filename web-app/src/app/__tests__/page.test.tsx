import { render, screen } from "@testing-library/react";
import Home from "./../page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home />);

    const body = screen.getByText(/Integrate effortlessly with any/i);

    expect(body).toBeInTheDocument();
  });
});
