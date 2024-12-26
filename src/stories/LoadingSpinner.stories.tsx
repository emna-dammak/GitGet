
import LoadingSpinner, {
  LoadingSpinnerProps,
} from "../components/LoadingSpinner"; // Adjust the import path to your component

export default {
  title: "Components/LoadingSpinner", // Story title
  component: LoadingSpinner, // Component we are documenting
  argTypes: {
    strokeColor: { control: "color" },
    strokeWidth: { control: "number" },
    animationDuration: { control: "text" },
    width: { control: "number" },
    visible: { control: "boolean" },
  },
};

// Default story for LoadingSpinner
export const Default = (args: LoadingSpinnerProps) => {
  return <LoadingSpinner {...args} />;
};

Default.args = {
  strokeColor: "white",
  strokeWidth: 5,
  animationDuration: "1",
  width: 25,
  visible: true,
};
