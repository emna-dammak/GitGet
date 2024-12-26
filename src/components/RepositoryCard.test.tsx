import { describe, test, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RepositoryCard from "./RepositoryCard";

// Mock the IconRenderer component
vi.mock("./IconRenderer", () => ({
  default: ({ language }: { language: string }) => (
    <div data-testid={`icon-${language}`}>{language} Icon</div>
  ),
}));

// Mock react-tooltip
vi.mock("react-tooltip", () => ({
  Tooltip: () => <div data-testid="tooltip">Tooltip</div>,
}));

describe("RepositoryCard", () => {
  const defaultProps = {
    name: "test-repo",
    description: "A test repository",
    languages: [
      { name: "JavaScript", color: "#f1e05a" },
      { name: "TypeScript", color: "#2b7489" },
    ],
    stars: 42,
    license: "MIT",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2023-12-31T00:00:00Z",
    url: "https://github.com/test/test-repo",
    visibility: "PUBLIC",
  };

  test("renders repository basic information", () => {
    render(<RepositoryCard {...defaultProps} />);

    // Check basic information
    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("A test repository")).toBeInTheDocument();
    expect(screen.getByText("public")).toBeInTheDocument();
  });

  test("renders metadata correctly", () => {
    render(<RepositoryCard {...defaultProps} />);

    // Check metadata
    expect(screen.getByText("Created at:")).toBeInTheDocument();
    expect(screen.getByText("Updated at:")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("MIT")).toBeInTheDocument();
  });

  test("formats dates correctly", () => {
    render(<RepositoryCard {...defaultProps} />);

    // Note: The exact format might depend on the user's locale
    expect(screen.getByText("01/01/2023")).toBeInTheDocument();
    expect(screen.getByText("31/12/2023")).toBeInTheDocument();
  });

  test("renders programming languages", () => {
    render(<RepositoryCard {...defaultProps} />);

    // Check if language icons are rendered
    expect(screen.getByTestId("icon-JavaScript")).toBeInTheDocument();
    expect(screen.getByTestId("icon-TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Programming Languages:")).toBeInTheDocument();
  });

  test("handles missing description gracefully", () => {
    const propsWithoutDescription = {
      ...defaultProps,
      description: undefined,
    };
    render(<RepositoryCard {...propsWithoutDescription} />);

    expect(screen.getByText("No description provided.")).toBeInTheDocument();
  });

  test("handles missing license gracefully", () => {
    const propsWithoutLicense = {
      ...defaultProps,
      license: undefined,
    };
    render(<RepositoryCard {...propsWithoutLicense} />);

    expect(screen.getByText("None")).toBeInTheDocument();
  });

  test("renders correct visibility badge styles", () => {
    const { rerender } = render(<RepositoryCard {...defaultProps} />);

    // Test PUBLIC visibility
    let badge = screen.getByText("public");
    expect(badge).toHaveClass("bg-green-500");

    // Test PRIVATE visibility
    rerender(<RepositoryCard {...defaultProps} visibility="PRIVATE" />);
    badge = screen.getByText("private");
    expect(badge).toHaveClass("bg-red-500");
  });

  test("renders repository link correctly", () => {
    render(<RepositoryCard {...defaultProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://github.com/test/test-repo");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("handles empty languages array", () => {
    const propsWithoutLanguages = {
      ...defaultProps,
      languages: [],
    };
    render(<RepositoryCard {...propsWithoutLanguages} />);

    expect(
      screen.queryByText("Programming Languages:")
    ).not.toBeInTheDocument();
  });

  test("renders tooltip for languages", () => {
    render(<RepositoryCard {...defaultProps} />);

    const languageElements = defaultProps.languages.map((lang) =>
      screen.getByTestId(`icon-${lang.name}`)
    );

    languageElements.forEach((elem, index) => {
      const parent = elem.parentElement;
      expect(parent).toHaveAttribute("data-tooltip-id", "language-tooltip");
      expect(parent).toHaveAttribute(
        "data-tooltip-content",
        defaultProps.languages[index].name
      );
    });
  });
});
