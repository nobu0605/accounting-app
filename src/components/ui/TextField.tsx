'use client'
import { TextField as MuiTextField } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { InputHTMLAttributes, ReactNode } from 'react'

type Props = {
  id?: string
  name?: string
  label?: ReactNode
  variant?: 'outlined' | 'filled' | 'standard'
  type?: InputHTMLAttributes<unknown>['type']
  value?: unknown
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: boolean
  helperText?: ReactNode
  required?: boolean
  placeholder?: string
}

export function TextField({
  id,
  name,
  label,
  variant,
  type,
  value,
  onChange,
  error,
  helperText,
  required,
  placeholder,
}: Props) {
  const theme = createTheme({
    components: {
      MuiFormLabel: {
        styleOverrides: {
          asterisk: {
            color: '#d32f2f',
          },
        },
      },
    },
  })

  return (
    <ThemeProvider theme={theme}>
      <MuiTextField
        id={id}
        name={name}
        label={label}
        variant={variant}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
        helperText={helperText}
        required={required}
        placeholder={placeholder}
      />
    </ThemeProvider>
  )
}
