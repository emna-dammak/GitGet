import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import IconRenderer from "./IconRenderer";

// Mock the icons module
vi.mock("./Icons", () => ({
  default: {
    javascript: "/path/to/javascript-icon.svg",
    python: "/path/to/python-icon.svg",
    csharp: "/path/to/csharp-icon.svg",
    cpp: "/path/to/cpp-icon.svg",
    objectivec: "/path/to/objectivec-icon.svg",
    generic: "/path/to/generic-icon.svg",
  },
}));

describe("IconRenderer Component", () => {
  it("renders the correct icon for 'JavaScript'", () => {
    render(<IconRenderer language="JavaScript" />);

    const icon = screen.getByAltText("JavaScript");
    expect(icon).toHaveAttribute("src", "/path/to/javascript-icon.svg");
  });

  it("renders the correct icon for 'python'", () => {
    render(<IconRenderer language="python" />);

    const icon = screen.getByAltText("python");
    expect(icon).toHaveAttribute("src", "/path/to/python-icon.svg");
  });

  it("renders the correct icon for 'C#'", () => {
    render(<IconRenderer language="C#" />);

    const icon = screen.getByAltText("C#");
    expect(icon).toHaveAttribute("src", "/path/to/csharp-icon.svg");
  });

  it("renders the correct icon for 'C++'", () => {
    render(<IconRenderer language="C++" />);

    const icon = screen.getByAltText("C++");
    expect(icon).toHaveAttribute("src", "/path/to/cpp-icon.svg");
  });

  it("renders the correct icon for 'Objective-C'", () => {
    render(<IconRenderer language="Objective-C" />);

    const icon = screen.getByAltText("Objective-C");
    expect(icon).toHaveAttribute("src", "/path/to/objectivec-icon.svg");
  });

  it("renders the 'generic' icon if language is not recognized", () => {
    render(<IconRenderer language="Rust" />);

    const icon = screen.getByAltText("Rust");
    expect(icon).toHaveAttribute("src", "/path/to/generic-icon.svg");
  });

  it("renders the icon case-insensitively (for 'python' and 'Python')", () => {
    render(<IconRenderer language="Python" />);

    const icon = screen.getByAltText("Python");
    expect(icon).toHaveAttribute("src", "/path/to/python-icon.svg");
  });
});
