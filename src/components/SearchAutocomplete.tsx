import React, { useState } from "react";

export interface SearchAutocompleteProps {
  items: any[]; // The items to be displayed in the autocomplete dropdown
  onSearch: (query: string) => void; // Callback to handle search input change
  onSelect: (item: any) => void; // Callback when an item is selected
  placeholder: string; // Placeholder text for the input
  formatResult: (item: any) => JSX.Element; // Format for each result item
  styling?: React.CSSProperties; // Optional custom styling for the search input
}

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
          style={{
            position: "absolute",
            top: "80%",
            left: 0,
            width: "100%",
            maxHeight: "200px",
            overflowY: "auto",
            borderRadius: "0 0 5px 5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            margin: 0,
            padding: 0,
            listStyle: "none",
          }}
        >
          {items.length > 0 ? (
            items.map((item, index) => (
              <li
                key={index}
                onClick={() => handleSelect(item)}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  borderBottom: "1px  #f0f0f0",
                  backgroundColor: "#2E3656",
                  color: "#ffffff",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#2E3656";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#2E3656";
                }}
              >
                {formatResult(item)}
              </li>
            ))
          ) : (
            <li
              style={{
                padding: "10px",
                backgroundColor: "#2E3656",
                color: "#ffffff",
              }}
            >
              No results found
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchAutocomplete;
