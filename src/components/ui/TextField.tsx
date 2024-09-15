'use client'
import { TextField as MuiTextField } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { InputHTMLAttributes, ReactNode } from 'react'
import { styled } from 'styled-components'

type Props = {
  id?: string
  name?: string
  label?: ReactNode
  variant?: 'outlined' | 'filled' | 'standard'
  type?: InputHTMLAttributes<unknown>['type']
  value?: unknown
  defaultValue?: unknown
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
  defaultValue,
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
        label={
          <>
            {label}
            {required && <StyledRequiredAsterisk> *</StyledRequiredAsterisk>}
          </>
        }
        variant={variant}
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        error={error}
        helperText={helperText}
        placeholder={placeholder}
      />
    </ThemeProvider>
  )
}

const StyledRequiredAsterisk = styled('span')`
  color: #d32f2f;
  font-size: 20px;
`
