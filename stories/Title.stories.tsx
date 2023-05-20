import type { Meta, StoryObj } from '@storybook/react';
import Title from '@/components/atoms/Title';

const meta: Meta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
};
export default meta;

type Story = StoryObj<typeof Title>;
export const Sandbox: Story = {
  args: {
    hLevel: 'h1',
    children: 'Hello World',
  },
};
