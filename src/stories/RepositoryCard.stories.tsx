// src/components/RepositoryCard.stories.tsx
import { StoryFn, Meta } from "@storybook/react";
import RepositoryCard, {
  RepositoryCardProps,
} from "../components/RepositoryCard";

// Sample data for the RepositoryCard component
const sampleRepository = {
  name: "My Awesome Repository",
  description: "This is a repository that does awesome things with React.",
  languages: [
    { name: "JavaScript", color: "#f7df1e" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "CSS", color: "#1572b6" },
  ],
  stars: 150,
  license: "MIT",
  createdAt: "2023-05-01T12:00:00Z",
  updatedAt: "2024-01-01T12:00:00Z",
  url: "https://github.com/my-awesome-repo",
  visibility: "PUBLIC",
};

export default {
  title: "Components/RepositoryCard", // Storybook title (category/component)
  component: RepositoryCard,
  parameters: {
    viewport: {
      defaultViewport: "responsive", // Enable default responsive view
    },
  },
} as Meta;

const Template: StoryFn<RepositoryCardProps> = (args) => (
  <RepositoryCard {...args} />
);

export const Default = Template.bind({});
Default.args = sampleRepository;
