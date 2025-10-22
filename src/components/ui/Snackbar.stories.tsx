import { Snackbar } from './Snackbar'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: Snackbar,
  argTypes: {
    onClose: { action: 'onClose' },
  },
} satisfies Meta<typeof Snackbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    message: 'This is a snackbar message',
    onClose: () => {},
    severity: 'success',
    variant: 'filled',
  },
}

export const WarningOutlined: Story = {
  args: {
    isOpen: true,
    message: 'This is a snackbar message',
    onClose: () => {},
    severity: 'warning',
    variant: 'outlined',
  },
}

export const InfoStandard: Story = {
  args: {
    isOpen: true,
    message: 'This is a snackbar message',
    onClose: () => {},
    severity: 'info',
    variant: 'standard',
  },
}

export const ErrorFilled: Story = {
  args: {
    isOpen: true,
    message: 'This is a snackbar message',
    onClose: () => {},
    severity: 'error',
    variant: 'filled',
  },
}
