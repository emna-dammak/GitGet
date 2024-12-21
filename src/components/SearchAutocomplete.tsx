import React from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

interface SearchAutocompleteProps {
  items: any[]; // The items to be displayed in the autocomplete dropdown
  onSearch: (query: string) => void; // Callback to handle search input change
  onSelect: (item: any) => void; // Callback when an item is selected
  placeholder: string; // Placeholder text for the input
  formatResult: (item: any) => JSX.Element; // Format for each result item
  styling: object; // Custom styling for the search input
}

const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  items,
  onSearch,
  onSelect,
  placeholder,
  formatResult,
  styling,
}) => {
  return (
    <ReactSearchAutocomplete
      items={items}
      onSearch={onSearch}
      onSelect={onSelect}
      placeholder={placeholder}
      formatResult={formatResult}
      styling={styling}
    />
  );
};

export default SearchAutocomplete;
