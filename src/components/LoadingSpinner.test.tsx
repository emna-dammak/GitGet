import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoadingSpinner from "./LoadingSpinner";
import { RotatingLines } from "react-loader-spinner";

// Mock the RotatingLines component to check the passed props
vi.mock("react-loader-spinner", () => ({
  RotatingLines: vi.fn(() => <div>Mocked Spinner</div>),
}));

describe("LoadingSpinner Component", () => {
  it("renders correctly with default props", () => {
    render(<LoadingSpinner />);

    // Check if the mock component renders
    expect(screen.getByText("Mocked Spinner")).toBeInTheDocument();
  });

  it("passes the correct default props to RotatingLines", () => {
    render(<LoadingSpinner />);

    // Check that RotatingLines was called with correct default props
    expect(RotatingLines).toHaveBeenCalledWith(
      expect.objectContaining({
        strokeColor: "white",
        strokeWidth: "5",
        animationDuration: "1",
        width: "25",
        visible: true,
      }),
      {}
    );
  });

  it("accepts and applies custom props", () => {
    const customProps = {
      strokeColor: "blue",
      strokeWidth: "3",
      animationDuration: "2",
      width: "30",
    };

    render(<LoadingSpinner {...customProps} />);

    // Check if the custom props are passed correctly
    expect(RotatingLines).toHaveBeenCalledWith(
      expect.objectContaining({
        strokeColor: "blue",
        strokeWidth: "3",
        animationDuration: "2",
        width: "30",
        visible: true,
      }),
      {}
    );
  });
});
