'use client'
import { DatePicker as MuiDatePicker } from '@mui/x-date-pickers/DatePicker'
import { styled } from 'styled-components'
import { errorColor } from '@/constants/datePicker'

// I use any type because of library problems.
// If I define the proper type, I have to wrap the component with LocalizationProvider.
type Props = {
  value: any
  onChange: (value: any, context: any) => void
  errorMessage: string | undefined
  onError?: (error: any, value: any) => void
  isError: boolean
  label: React.ReactNode
  required?: boolean
}

export function DatePicker({
  value,
  onChange,
  errorMessage,
  onError,
  isError,
  label,
  required = false,
}: Props) {
  return (
    <MuiDatePicker
      label={
        <>
          {label}
          {required && <StyledRequiredAsterisk> *</StyledRequiredAsterisk>}
        </>
      }
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          helperText: errorMessage,
        },
      }}
      onError={onError}
      sx={errorColor(isError)}
    />
  )
}

const StyledRequiredAsterisk = styled('span')`
  color: #d32f2f;
  font-size: 20px;
`
