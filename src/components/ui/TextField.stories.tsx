import { TextField } from './TextField'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: TextField,
  argTypes: {
    onChange: { action: 'onChange' },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    id: 'text-field',
    name: 'text-field',
    label: 'text field',
    type: 'text',
    onChange: () => {},
    error: false,
    placeholder: 'Placeholder text',
    helperText: ' Optional helper text',
  },
}

export const Error: Story = {
  args: {
    id: 'text-field',
    name: 'text-field',
    label: 'text field',
    type: 'text',
    onChange: () => {},
    error: true,
    placeholder: 'Placeholder text',
    required: true,
    helperText: <span>This field is required</span>,
  },
}
