// src/components/UserCard.stories.tsx
import { StoryFn, Meta } from "@storybook/react";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import UserCard, { UserCardProps } from "../components/UserCard";

// Sample data for UserCard component
const sampleUser = {
  avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  name: "John Doe",
  login: "johndoe",
  bio: "A passionate developer.",
  company: "TechCorp",
  repositories: 42,
  followers: 1200,
  following: 500,
  joinedAt: "2020-03-15T00:00:00Z",
};

export default {
  title: "Components/UserCard", // Storybook title (category/component)
  component: UserCard,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} as Meta;

const Template: StoryFn<UserCardProps> = (args) => <UserCard {...args} />;

export const Default = Template.bind({});
Default.args = sampleUser;
