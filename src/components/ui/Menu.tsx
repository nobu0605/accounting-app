'use client'
import { Menu as MuiMenu, MenuItem } from '@mui/material'

export type MenuItem = {
  onClick: () => void
  name: string
}

type Props = {
  menuItems: MenuItem[]
  anchorEl: HTMLElement | null
  setAnchorEl: (el: HTMLElement | null) => void
}

export function Menu({ menuItems, anchorEl, setAnchorEl }: Props) {
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <MuiMenu
      id='basic-menu'
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
    >
      {menuItems.map((menuItem: MenuItem, i) => (
        <MenuItem key={i} onClick={menuItem.onClick}>
          {menuItem.name}
        </MenuItem>
      ))}
    </MuiMenu>
  )
}
