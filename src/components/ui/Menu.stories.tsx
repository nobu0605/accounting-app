import { useState } from 'react'
import { Menu } from './Menu'
import type { Meta, StoryObj } from '@storybook/nextjs'
import { Button } from '@/components/ui/Button'
import { Flex } from '@/components/ui/Flex'

const meta = {
  component: Menu,
  argTypes: {
    setAnchorEl: {
      action: 'setAnchorEl',
    },
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menuItems: [
      { onClick: () => console.info('Item 1 clicked'), name: 'Item 1' },
      { onClick: () => console.info('Item 2 clicked'), name: 'Item 2' },
      { onClick: () => console.info('Item 3 clicked'), name: 'Item 3' },
    ],
    anchorEl: null,
    setAnchorEl: () => {},
  },
  render: (args) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(args.anchorEl)

    return (
      <>
        <Flex $direction='row' $gap={'8px'} onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Button variant='outlined'>Open Menu</Button>
        </Flex>
        <Menu anchorEl={anchorEl} setAnchorEl={setAnchorEl} menuItems={args.menuItems} />
      </>
    )
  },
}
