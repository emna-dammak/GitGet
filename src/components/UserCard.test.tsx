import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import UserCard, { UserCardProps } from "./UserCard";
import { BrowserRouter } from "react-router-dom";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate, // Ensure this is correct
    BrowserRouter: actual.BrowserRouter, // Ensure BrowserRouter is included
  };
});


// Test data
const mockUserData = {
  avatarUrl: "https://example.com/avatar.jpg",
  name: "John Doe",
  login: "johndoe",
  bio: "Software Developer",
  company: "Tech Corp",
  repositories: 50,
  followers: 100,
  following: 75,
  joinedAt: "2023-01-01T00:00:00Z",
} as UserCardProps;


// Wrapper component for Router context
const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("UserCard Component", () => {
  beforeEach(() => {
    // Clear mock calls between tests
    vi.clearAllMocks();
  });

it("renders all user information correctly", () => {
  renderWithRouter(<UserCard {...mockUserData} />);

  expect(screen.getByText("John Doe")).toBeInTheDocument();
  expect(screen.getByText("johndoe")).toBeInTheDocument();
  expect(screen.getByText("Software Developer")).toBeInTheDocument();
  expect(screen.getByText("Tech Corp")).toBeInTheDocument();
  expect(screen.getByText("50")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
  expect(screen.getByText("75")).toBeInTheDocument();

  // Check if the date is formatted correctly
  const joinedAtDates = screen.getAllByText("01/01/2023");
  expect(joinedAtDates).toHaveLength(1); // If there should be exactly one match
});

  it("renders avatar with correct src and alt text", () => {
    renderWithRouter(<UserCard {...mockUserData} />);

    const avatar = screen.getByAltText("johndoe") as HTMLImageElement;
    expect(avatar).toBeInTheDocument();
    expect(avatar.src).toBe("https://example.com/avatar.jpg");
  });

  it("navigates to repositories page when clicking on name", () => {
    renderWithRouter(<UserCard {...mockUserData} />);

    const nameElement = screen.getByText("John Doe");
    fireEvent.click(nameElement);

    expect(mockedNavigate).toHaveBeenCalledWith("/repositories/johndoe");
  });

  it("maintains correct structure on different screen sizes", () => {
    renderWithRouter(<UserCard {...mockUserData} />);

    // Check if main container has correct classes for responsive design
    const container = screen.getByRole("img").closest("div");
    expect(container).toHaveClass("flex", "flex-col", "sm:flex-row");
  });

  it("displays correct stats formatting", () => {
    renderWithRouter(<UserCard {...mockUserData} />);

    // Check if stats are formatted correctly with labels
    expect(screen.getByText(/Repositories:/)).toBeInTheDocument();
    expect(screen.getByText(/Followers:/)).toBeInTheDocument();
    expect(screen.getByText(/Following:/)).toBeInTheDocument();
    expect(screen.getByText(/Joined At:/)).toBeInTheDocument();
  });
});
