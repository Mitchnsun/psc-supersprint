/* eslint-disable import/no-extraneous-dependencies */
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Title from '../components/atoms/Title';

export default {
  title: 'Components/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

const Template: ComponentStory<typeof Title> = (args) => <Title {...args} />;

export const Sandbox = Template.bind({});
Sandbox.args = {
  hLevel: 'h1',
  children: 'Hello World',
};
