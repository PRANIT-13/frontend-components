import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import InputField, { type InputFieldProps } from '../components/InputField';

const meta: Meta<InputFieldProps> = {
  title: 'Form/InputField',
  component: InputField,
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    variant: 'outlined',
    size: 'md',
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<InputFieldProps>;

export const Basic: Story = {};

export const Invalid: Story = {
  args: { invalid: true, errorMessage: 'This field is required' },
};

export const Disabled: Story = { args: { disabled: true } };

export const Loading: Story = { args: { loading: true, placeholder: 'Loading...' } };

export const Controlled: Story = {
  render: (args) => {
    const [val, setVal] = useState('');
    return (
      <div className="space-y-4">
        <InputField
          {...args}
          label="Controlled"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          helperText={`Length: ${val.length}`}
        />
      </div>
    );
  },
};
