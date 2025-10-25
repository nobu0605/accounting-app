import { Tooltip } from './Tooltip'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: Tooltip,
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Tooltip Title',
    children: 'Hover over me',
  },
}

export const Arrow: Story = {
  args: {
    title: 'Tooltip Title',
    children: 'Hover over me',
    arrow: true,
  },
}

export const Right: Story = {
  args: {
    title: 'Tooltip Title',
    children: 'Hover over me',
    placement: 'right',
  },
}
