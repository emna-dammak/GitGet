// src/components/UserDetails.stories.tsx
import { StoryFn, Meta } from "@storybook/react";
import UserDetails, { UserDetailsProps } from "../components/UserDetails";

// Sample data for UserDetails component
const sampleUserDetails = {
  name: "John Doe",
  username: "johndoe",
  bio: "A passionate developer with a love for coding.",
  stats: "Joined 2020",
  followers: "1500",
  following: "500",
  location: "New York, USA",
  avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
};

export default {
  title: "Components/UserDetails", // Storybook title (category/component)
  component: UserDetails,
} as Meta;

const Template: StoryFn<UserDetailsProps> = (args) => <UserDetails {...args} />;

export const Default = Template.bind({});
Default.args = sampleUserDetails;
