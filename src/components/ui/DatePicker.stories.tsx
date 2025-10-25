import { ComponentProps } from 'react'
import { DatePicker } from './DatePicker'
import type { Meta, StoryObj } from '@storybook/nextjs'
import MuiLocalizationProvider from '@/lib/MuiLocalizationProvider'

const meta = {
  component: DatePicker,
  argTypes: {
    onChange: { action: 'changed' },
    onError: { action: 'error' },
  },
} satisfies Meta<typeof DatePicker>

export default meta
type Story = StoryObj<typeof meta>

const DatePickerTemplate = (args: ComponentProps<typeof DatePicker>) => (
  <MuiLocalizationProvider>
    <DatePicker {...args} />
  </MuiLocalizationProvider>
)

export const Default: Story = {
  args: {
    value: null,
    onChange: () => {},
    errorMessage: undefined,
    isError: false,
    label: 'DatePicker',
  },
  render: DatePickerTemplate,
}

export const Error: Story = {
  args: {
    value: null,
    onChange: () => {},
    errorMessage: 'This field is required',
    isError: true,
    label: 'DatePicker',
    required: true,
  },
  render: DatePickerTemplate,
}
