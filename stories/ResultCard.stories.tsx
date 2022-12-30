/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';

import ResultCard from '../components/ResultCard';
import { CAT } from '../utils/categories.utils';

export default {
  title: 'Components/ResultCard',
  component: ResultCard,
} as ComponentMeta<typeof ResultCard>;

const Template: ComponentStory<typeof ResultCard> = (args) => <ResultCard {...args} />;

export const Sandbox = Template.bind({});
Sandbox.args = {
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
};
