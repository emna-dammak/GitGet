import { render, screen } from "@testing-library/react";
import Navbar from "./NavBar";
import { describe, it, expect } from "vitest";



describe("Navbar Component", () => {
  it("renders the navbar with correct structure and elements", () => {
    render(<Navbar />);

    // Check if the logo is rendered with correct src and alt attributes
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo-navbar.svg"); // Actual src

    // Check if navigation links are rendered
    const homeLink = screen.getByText("Home");
    const searchLink = screen.getByText("Search");

    expect(homeLink).toBeInTheDocument();
    expect(searchLink).toBeInTheDocument();

    // Check if links have the correct href attributes
    expect(homeLink).toHaveAttribute("href", "/");
    expect(searchLink).toHaveAttribute("href", "/");
  });

  it("has the correct CSS classes for styling", () => {
    render(<Navbar />);

    const navbar = screen.getByRole("navigation");

    expect(navbar).toHaveClass(
      "bg-[#0d082d]",
      "bg-opacity-50",
      "backdrop-blur-lg",
      "text-white",
      "p-4",
      "pl-10",
      "flex",
      "justify-between",
      "items-center",
      "fixed",
      "w-full",
      "h-16",
      "z-10",
      "border-b-2",
      "border-slate-800"
    );
  });

  it("renders navigation links with hover styles", () => {
    render(<Navbar />);

    const homeLink = screen.getByText("Home");
    const searchLink = screen.getByText("Search");

    // Check hover class
    expect(homeLink).toHaveClass("hover:text-gray-400");
    expect(searchLink).toHaveClass("hover:text-gray-400");
  });

  it("renders the logo with correct size", () => {
    render(<Navbar />);

    const logo = screen.getByAltText("Logo");
    expect(logo).toHaveClass("h-8", "w-8");
  });

  it("is accessible and properly labeled", () => {
    render(<Navbar />);

    const navbar = screen.getByRole("navigation");
    expect(navbar).toBeInTheDocument();

    // Ensure it has no accessibility issues (e.g., missing ARIA attributes)
    expect(navbar).not.toHaveAttribute("aria-hidden");
  });
});
