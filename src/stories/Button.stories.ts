import type { Meta, StoryObj } from "@storybook/react";
import '../utils/tailwind.css';

import Button from "../components/Button";
type Story = StoryObj<typeof meta>;

const meta = {
  title: "Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
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