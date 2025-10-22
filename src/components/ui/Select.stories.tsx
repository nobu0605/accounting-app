import { useState } from 'react'
import { Select } from './Select'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: Select,
  argTypes: {
    onChange: {
      action: 'onChange',
    },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { name: 'Option 1', value: '1' },
      { name: 'Option 2', value: '2' },
      { name: 'Option 3', value: '3' },
    ],
    label: 'Select',
    minWidth: 200,
    value: '1',
    onChange: () => {},
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value)

    return <Select {...args} value={value} onChange={(e) => setValue(String(e.target.value))} />
  },
}

export const Error: Story = {
  args: {
    options: [
      { name: 'Option 1', value: '1' },
      { name: 'Option 2', value: '2' },
      { name: 'Option 3', value: '3' },
    ],
    label: 'Select',
    minWidth: 200,
    value: '1',
    onChange: () => {},
    required: true,
    errorMessage: 'This field is required',
  },
  render: (args) => {
    const [value, setValue] = useState<string>(args.value)

    return <Select {...args} value={value} onChange={(e) => setValue(String(e.target.value))} />
  },
}
