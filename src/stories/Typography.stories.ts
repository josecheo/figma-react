import type { Meta, StoryObj } from "@storybook/react";
import '../utils/tailwind.css';

import Typography from "../components/Typography";
type Story = StoryObj<typeof meta>;

const meta = {
  title: "Typography",
  component: Typography,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Typography>;
export default meta;

export const Primary: Story = {
  args: {
    text: "Get Started",
    size: "small",
    weight: "bold",
  },
};