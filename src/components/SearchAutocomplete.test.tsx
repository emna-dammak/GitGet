import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, vi, expect } from "vitest";
import SearchAutocomplete, {
  SearchAutocompleteProps,
} from "./SearchAutocomplete";

describe("SearchAutocomplete Component", () => {
  const mockItems = [
    { id: "1", name: "John Doe", avatar: "", bio: "Software Engineer" },
    { id: "2", name: "Jane Smith", avatar: "", bio: "Designer" },
  ];

  const mockOnSearch = vi.fn();
  const mockOnSelect = vi.fn();
  const mockFormatResult = (item: any) => <span>{item.name}</span>;

  const defaultProps: SearchAutocompleteProps = {
    items: mockItems,
    onSearch: mockOnSearch,
    onSelect: mockOnSelect,
    placeholder: "Search...",
    formatResult: mockFormatResult,
  };

  it("renders the input field with placeholder", () => {
    render(<SearchAutocomplete {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    expect(inputElement).toBeInTheDocument();
  });

  it("calls onSearch when input value changes", () => {
    render(<SearchAutocomplete {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "test" } });
    expect(mockOnSearch).toHaveBeenCalledWith("test");
  });

  it("displays dropdown with items when input is typed", () => {
    render(<SearchAutocomplete {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "John" } });

    const listItem = screen.getByText("John Doe");
    expect(listItem).toBeInTheDocument();
  });

  it("calls onSelect when an item is clicked", () => {
    render(<SearchAutocomplete {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "John" } });

    const listItem = screen.getByText("John Doe");
    fireEvent.click(listItem);

    expect(mockOnSelect).toHaveBeenCalledWith(mockItems[0]);
  });

  it("hides dropdown when no input value is present", () => {
    render(<SearchAutocomplete {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputElement, { target: { value: "" } });

    const listItems = screen.queryAllByRole("listitem");
    expect(listItems.length).toBe(0);
  });
});
