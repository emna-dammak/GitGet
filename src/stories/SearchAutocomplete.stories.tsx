// src/components/SearchAutocomplete.stories.tsx
import { StoryFn, Meta } from "@storybook/react";
import SearchAutocomplete, {
  SearchAutocompleteProps,
} from "../components/SearchAutocomplete";

// Sample data for SearchAutocomplete
const sampleItems = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "TypeScript" },
  { id: 3, name: "React" },
  { id: 4, name: "Node.js" },
  { id: 5, name: "CSS" },
];

const onSearch = (query: string) => {
  console.log("Searching for:", query);
};

const onSelect = (item: any) => {
  console.log("Selected item:", item);
};

const formatResult = (item: any) => {
  return <div>{item.name}</div>;
};

const customStyling = {
  height: "40px",
  width: "300px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  padding: "10px",
};

export default {
  title: "Components/SearchAutocomplete", // Storybook title (category/component)
  component: SearchAutocomplete,
} as Meta;

const Template: StoryFn<SearchAutocompleteProps> = (args) => (
  <SearchAutocomplete {...args} />
);

export const Default = Template.bind({});
Default.args = {
  items: sampleItems,
  onSearch: onSearch,
  onSelect: onSelect,
  placeholder: "Search for a language...",
  formatResult: formatResult,
  styling: customStyling,
};
