import { Meta, StoryFn } from "@storybook/react";

import Navbar from "../components/NavBar"; // Adjust the path to your Navbar component

export default {
  title: "Components/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen", 
  },
} as Meta<typeof Navbar>;

const Template: StoryFn<typeof Navbar> = (args) =>  <Navbar {...args} />;

// Default story
export const Default = Template.bind({});
Default.args = {};
