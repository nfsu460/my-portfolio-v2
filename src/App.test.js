import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const submitButton = screen.queryByText("submit");
  expect(submitButton).not.toBeInTheDocument();
});
