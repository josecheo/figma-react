import type { Meta, StoryObj } from "@storybook/react";

import Button from "../components/Button/";
type Story = StoryObj<typeof meta>;

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "red" },
  },
} satisfies Meta<typeof Button>;
export default meta;

export const Primary: Story = {
  args: {
    variant: "primary",
    label: "Get Started",
    size: "small",
    disabled: false,
  },
};