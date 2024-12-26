import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import UserDetails from "./UserDetails";

describe("UserDetails", () => {
  const defaultProps = {
    name: "John Doe",
    username: "johndoe",
    bio: "A software developer",
    repositoryCount: "42",
    followers: "100",
    following: "50",
    location: "San Francisco",
    avatarUrl: "https://example.com/avatar.jpg",
  };

  test("renders user information correctly", () => {
    render(<UserDetails {...defaultProps} />);

    // Check if basic user information is rendered
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("A software developer")).toBeInTheDocument();
    expect(screen.getByText("San Francisco")).toBeInTheDocument();
  });

  test("renders avatar with correct attributes", () => {
    render(<UserDetails {...defaultProps} />);

    const avatar = screen.getByAltText("johndoe's avatar") as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe("https://example.com/avatar.jpg");
  });

  test("renders all stats with correct values", () => {
    render(<UserDetails {...defaultProps} />);

    // Check stats values
    expect(screen.getByText("42")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();

    // Check stats labels
    expect(screen.getByText("Repositories:")).toBeInTheDocument();
    expect(screen.getByText("Followers:")).toBeInTheDocument();
    expect(screen.getByText("Following:")).toBeInTheDocument();
  });

  test("renders stats icons", () => {
    render(<UserDetails {...defaultProps} />);

    const icons = screen.getAllByRole("img");
    // First image is avatar, rest are stat icons
    expect(icons.length).toBe(4); // 1 avatar + 3 stat icons

    // Check if stat icons have correct src
    expect(icons[1]).toHaveAttribute("src", "/Repositories.svg");
    expect(icons[2]).toHaveAttribute("src", "/Followers.svg");
    expect(icons[3]).toHaveAttribute("src", "/Following.svg");
  });

  test("handles null bio gracefully", () => {
    const propsWithNullBio = {
      ...defaultProps,
      bio: null,
    };
    render(<UserDetails {...propsWithNullBio} />);

    // Bio should not be rendered when null
    const bioElements = screen.queryByText("null");
    expect(bioElements).not.toBeInTheDocument();
  });

  test("handles null location gracefully", () => {
    const propsWithNullLocation = {
      ...defaultProps,
      location: null,
    };
    render(<UserDetails {...propsWithNullLocation} />);

    // Location should not be rendered when null
    const locationElement = screen.queryByText("Location:");
    expect(locationElement).not.toBeInTheDocument();
  });

  test("applies correct responsive classes", () => {
    render(<UserDetails {...defaultProps} />);

    // Check if main container has correct classes
    const container = screen
      .getByRole("img", { name: "johndoe's avatar" })
      .closest("div");
    expect(container?.parentElement).toHaveClass(
      "bg-[#0d082d]",
      "bg-opacity-50",
      "text-white",
      "p-6",
      "rounded-lg",
      "flex",
      "flex-col",
      "items-center"
    );

    // Check if avatar has responsive classes
    const avatar = screen.getByRole("img", { name: "johndoe's avatar" });
    expect(avatar).toHaveClass(
      "w-24",
      "h-24",
      "md:w-36",
      "md:h-36",
      "lg:w-44",
      "lg:h-44",
      "rounded-full",
      "mb-4"
    );
  });
});
