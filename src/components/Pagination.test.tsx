import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import Pagination from "./Pagination";

describe("Pagination Component", () => {
  const onPageChangeMock = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly with basic props", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    // Check for navigation buttons
    expect(screen.getByText("Prev")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();

    // Check for page numbers
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("disables Prev button on the first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByText("Prev");
    expect(prevButton).toBeDisabled();
  });

  it("disables Next button on the last page", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange with the correct page when Prev is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const prevButton = screen.getByText("Prev");
    fireEvent.click(prevButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(2); // Current page - 1
  });

  it("calls onPageChange with the correct page when Next is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4); // Current page + 1
  });

  it("calls onPageChange with the correct page when a page number is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={onPageChangeMock}
      />
    );

    const pageButton = screen.getByText("4");
    fireEvent.click(pageButton);

    expect(onPageChangeMock).toHaveBeenCalledWith(4); // Clicked page number
  });

  it("renders ellipsis correctly when there are hidden pages", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={onPageChangeMock}
      />
    );

    // Check for ellipsis
    expect(screen.getAllByText("...")).toHaveLength(2);

    // Check for correct page numbers
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("6")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
