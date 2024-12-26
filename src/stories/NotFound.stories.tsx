import NotFound, { NotFoundProps } from "../components/NotFound"; // Adjust the import path to your component

export default {
  title: "Components/NotFound", // Story title
  component: NotFound, // Component we are documenting
  argTypes: {
    type: { control: "text" },
    message: { control: "text" },
  },
};

// Default story for NotFound
export const Default = (args: NotFoundProps) => {
  return <NotFound {...args} />;
};

Default.args = {
  type: "items",
  message: "We couldn't find the items you're looking for. Please try again.",
};
