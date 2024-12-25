import  { useState } from "react";
import { Meta, StoryFn } from "@storybook/react"; // Use StoryFn instead of Story
import Pagination from "../components/Pagination"; // Adjust the import path as necessary

export default {
  title: "Components/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered", // Optional: Ensures the component is centered in Storybook
  },
} as Meta<typeof Pagination>;

const Template: StoryFn<typeof Pagination> = (args) => {
  const [currentPage, setCurrentPage] = useState(args.currentPage || 1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  currentPage: 1,
  totalPages: 10,
};

export const MiddlePage = Template.bind({});
MiddlePage.args = {
  currentPage: 5,
  totalPages: 10,
};

export const LastPage = Template.bind({});
LastPage.args = {
  currentPage: 10,
  totalPages: 10,
};

export const FewPages = Template.bind({});
FewPages.args = {
  currentPage: 2,
  totalPages: 3,
};
