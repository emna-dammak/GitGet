// src/stories/SearchAutocomplete.stories.tsx
import { useState } from "react";
import SearchAutocomplete, {
  SearchAutocompleteProps,
} from "../components/SearchAutocomplete"; // Adjust the import path to your component

// Mock data for the search items
const mockItems = [
  { name: "Apple", id: 1 },
  { name: "Banana", id: 2 },
  { name: "Orange", id: 3 },
  { name: "Pineapple", id: 4 },
  { name: "Grape", id: 5 },
];

// Default formatResult function to display item names
const formatResult = (item: any) => <span>{item.name}</span>;

export default {
  title: "Components/SearchAutocomplete", // Story title
  component: SearchAutocomplete, // Component we are documenting
  argTypes: {
    items: { control: "array" },
    onSearch: { action: "searched" },
    onSelect: { action: "selected" },
    placeholder: { control: "text" },
    styling: { control: "object" }, // Allow styling to be controlled in Storybook
  },
};

// Default story for SearchAutocomplete
export const Default = (args: SearchAutocompleteProps) => {
  const [items, setItems] = useState(mockItems);

  // Example search function, modify the items based on query
  const handleSearch = (query: string) => {
    if (query) {
      setItems(
        mockItems.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setItems(mockItems);
    }
  };

  // Example select function
  const handleSelect = (item: any) => {
    alert(`Selected: ${item.name}`);
  };

  return (
    <SearchAutocomplete
      {...args}
      items={items}
      onSearch={handleSearch}
      onSelect={handleSelect}
      formatResult={formatResult}
    />
  );
};

Default.args = {
  placeholder: "Search fruits...",
  styling: {
    backgroundColor: "#0d082d", // Light grey background
    color:"#000000",
    borderRadius: "5px",
    padding: "10px",
    width: "100%",
    fontSize: "14px", // Custom font size
  },
};
