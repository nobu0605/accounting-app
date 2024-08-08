'use client'
import { Tooltip as MuiTooltip, IconButton } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import React, { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top'
  arrow?: boolean
  fontSize?: string
}

export function Tooltip({ title, children, placement, arrow, fontSize = '15px' }: Props) {
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize,
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MuiTooltip title={title} placement={placement} arrow={arrow}>
        <IconButton>{children}</IconButton>
      </MuiTooltip>
    </ThemeProvider>
  )
}
