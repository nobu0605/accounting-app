import { Flex } from './Flex'
import type { Meta, StoryObj } from '@storybook/nextjs'

const meta = {
  component: Flex,
} satisfies Meta<typeof Flex>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <p>Flex</p>,
  },
}

export const DirectionColumn: Story = {
  args: {
    $direction: 'column',
    $gap: '10px',
  },
  render: (args) => (
    <Flex {...args}>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </Flex>
  ),
}

export const ItemsCentered: Story = {
  args: {
    $items: 'center',
    $gap: '10px',
  },
  render: (args) => (
    <Flex {...args} style={{ height: '200px' }}>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </Flex>
  ),
}

export const ItemsJustified: Story = {
  args: {
    $content: 'center',
    $gap: '10px',
  },
  render: (args) => (
    <Flex {...args}>
      <p>Item 1</p>
      <p>Item 2</p>
      <p>Item 3</p>
    </Flex>
  ),
}
