import { Meta, StoryFn } from "@storybook/react";

import IconRenderer from "../components/IconRenderer";

export default {
  title: "Components/IconRenderer",
  component: IconRenderer,
  argTypes: {
    language: {
      control: {
        type: "select"}, // Changes the control to a dropdown
        options: [
          "javascript",
          "typescript",
          "python",
          "php",
          "coffeescript",
          "kotlin",
          "shell",
          "elixir",
          "groovy",
          "jupyternotebook",
          "sqf",
          "objective-c",
          "monkeyc",
          "powershell",
          "tex",
          "vimscripts",
          "zil",
          "c",
          "c#",
          "c++",
          "ruby",
          "rust",
          "java",
          "html",
          "css",
          "swift",
          "go",
          "dart",
          "julia",
          "hcl",
          "handlebars",
          "lua",
          "scala",
          "unknown", 
        ],
    
      description:
        "The programming language name to render the corresponding icon.",
      defaultValue: "javascript", 
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "javascript" },
      },
    },
  },
} as Meta<typeof IconRenderer>;

const Template: StoryFn<typeof IconRenderer> = (args) => (
  <IconRenderer {...args} />
);

// Default story with dynamic controls
export const Default = Template.bind({});
Default.args = {
  language: "javascript",
};

// Additional specific stories
export const Python = Template.bind({});
Python.args = {
  language: "python",
};

export const CSharp = Template.bind({});
CSharp.args = {
  language: "c#",
};

export const Cpp = Template.bind({});
Cpp.args = {
  language: "c++",
};

export const Generic = Template.bind({});
Generic.args = {
  language: "unknown",
};
