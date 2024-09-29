import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
} from '@mui/material'
import { styled } from 'styled-components'
import type { SelectProps } from '@mui/material'

type Props = {
  options: { value: number | string; name: string }[]
  label: string
  minWidth?: number
  onChange: SelectProps['onChange']
  value: string
  required?: boolean
  errorMessage?: string
}

export function Select({
  options,
  label,
  minWidth = 200,
  onChange,
  value,
  required = false,
  errorMessage,
}: Props) {
  return (
    <FormControl sx={{ minWidth }} error={!!errorMessage}>
      <InputLabel>
        {label}
        {required && <StyledRequiredAsterisk> *</StyledRequiredAsterisk>}
      </InputLabel>
      <MuiSelect value={value} onChange={onChange} label={label}>
        {options?.map((option) => (
          <MenuItem key={option.value} value={option.value.toString()}>
            {option.name}
          </MenuItem>
        ))}
      </MuiSelect>
      {!!errorMessage && <FormHelperText>{label} is required</FormHelperText>}
    </FormControl>
  )
}

const StyledRequiredAsterisk = styled('span')`
  color: #d32f2f;
  font-size: 20px;
`
