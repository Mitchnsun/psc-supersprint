import type { Meta, StoryObj } from '@storybook/react';
import ResultCard from '@/components/ResultCard';
import { CAT } from '@/utils/categories.utils';

const meta: Meta<typeof ResultCard> = {
  title: 'Components/ResultCard',
  component: ResultCard,
};
export default meta;

type Story = StoryObj<typeof ResultCard>;
export const Sandbox: Story = {
  args: {
    result: {
      bib: 99,
      bike: 555,
      cat: CAT.S,
      firstname: 'Matthiou',
      lastname: 'Compète',
      ranks: { scratch: 1, gender: 1, cat: 1 },
      run: 676,
      sex: 'M',
      swim: 299,
      total: 1530,
    },
  },
};
