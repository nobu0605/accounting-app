'use client'
import { Button as MuiButton } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { ReactNode } from 'react'
import { mainColor } from '@/constants/colors'

type Props = {
  children: ReactNode | string
  variant?: 'text' | 'outlined' | 'contained'
  startIcon?: ReactNode
  endIcon?: ReactNode
  size?: 'small' | 'medium' | 'large'
  color?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  disabled?: boolean
  onClick?: () => void
  type?: 'submit' | 'reset' | 'button' | undefined
}

export function Button({
  children,
  variant = 'contained',
  startIcon,
  endIcon,
  size,
  color = 'primary',
  disabled,
  onClick,
  type,
}: Props) {
  const theme = createTheme({
    palette: {
      primary: {
        main: mainColor,
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MuiButton
        variant={variant}
        startIcon={startIcon}
        endIcon={endIcon}
        size={size}
        color={color}
        disabled={disabled}
        onClick={onClick}
        type={type}
      >
        {children}
      </MuiButton>
    </ThemeProvider>
  )
}
