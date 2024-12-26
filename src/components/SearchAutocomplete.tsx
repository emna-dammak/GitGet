import React, { useState } from "react";

export interface SearchAutocompleteProps {
  items: any[]; // The items to be displayed in the autocomplete dropdown
  onSearch: (query: string) => void; // Callback to handle search input change
  onSelect: (item: any) => void; // Callback when an item is selected
  placeholder: string; // Placeholder text for the input
  formatResult: (item: any) => JSX.Element; // Format for each result item
  styling?: React.CSSProperties; // Optional custom styling for the search input
}

/**
 * SearchAutocomplete component provides an input field with an autocomplete dropdown.
 * It allows users to search and select items from a list of suggestions.
 *
 * @component
 * @param {SearchAutocompleteProps} props - The props for the SearchAutocomplete component.
 * @param {Array<any>} props.items - The list of items to display in the dropdown.
 * @param {function} props.onSearch - Callback function to perform search when input changes.
 * @param {function} props.onSelect - Callback function triggered when an item is selected.
 * @param {string} props.placeholder - Placeholder text for the input field.
 * @param {function} props.formatResult - Function to format the display of each item in the dropdown.
 * @param {React.CSSProperties} [props.styling] - Optional custom styling for the input and dropdown.
 *
 * @returns {JSX.Element} The rendered SearchAutocomplete component.
 *
 * @example
 * <SearchAutocomplete
 *   items={items}
 *   onSearch={handleSearch}
 *   onSelect={handleSelect}
 *   placeholder="Search..."
 *   formatResult={(item) => item.name}
 *   styling={{ backgroundColor: 'white' }}
 * />
 */
const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  items,
  onSearch,
  onSelect,
  placeholder,
  formatResult,
  styling,
}) => {
  const [inputValue, setInputValue] = useState<string>(""); // State to track input value
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false); // State for dropdown visibility

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    onSearch(value); // Call the parent callback to perform search
    setIsDropdownVisible(value.length > 0); // Show dropdown only if input is not empty
  };

  // Handle selecting an item
  const handleSelect = (item: any) => {
    setInputValue(item.name || ""); // Update input value with selected item's name
    setIsDropdownVisible(false); // Hide dropdown
    onSelect(item); // Trigger parent callback with selected item
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Input field */}
      <input
        className="focus:ring-0 focus:outline-none"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: inputValue.trim().length == 0 ? "5px" : "5px 5px 0 0",
          ...styling,
        }}
      />

      {/* Dropdown with suggestions */}
      {isDropdownVisible && (
        <ul
          className="absolute top-[80%] left-0 w-full max-h-[200px] overflow-y-auto rounded-b-lg shadow-md z-10 list-none p-0"
          style={{
            borderRadius: "0 0 5px 5px",
            ...styling
          }}
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                className="px-3 py-2 cursor-pointer hover:bg-opacity-75 text-white"
              >
                {formatResult(item)}
              </li>
            ))
          ) : (
            <li className="px-3 py-2 bg-opacity-75 text-white">
              Fetching results...
            </li>
          )}
        </ul>
      )}

      {/* Custom scrollbar styles */}
      <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
        {/* The content inside ul will inherit the custom scrollbar */}
      </div>
    </div>
  );
};

export default SearchAutocomplete;
