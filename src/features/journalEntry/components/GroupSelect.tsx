import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  ListSubheader,
} from '@mui/material'
import { ReactElement } from 'react'
import { styled } from 'styled-components'
import type { SelectProps } from '@mui/material'
import { camelToLowerWithSpaces } from '@/utils/common/string'

export type Option = {
  value: number
  name: string
}

export type GroupAccounts = {
  [key: string]: Option[]
}

type Props = {
  options: GroupAccounts
  label: string
  minWidth?: number
  onChange: SelectProps['onChange']
  value: string
  required?: boolean
  errorMessage?: string
}

export function GroupSelect({
  options,
  label,
  minWidth = 200,
  onChange,
  value,
  required = false,
  errorMessage,
}: Props) {
  function renderOptions() {
    const optionElements: ReactElement[] = []

    Object.keys(options).map((key) => {
      optionElements.push(<StyledListSubheader>{camelToLowerWithSpaces(key)}</StyledListSubheader>)
      options[key].forEach((option: Option) => {
        optionElements.push(
          <MenuItem key={option.value} value={option.value.toString()}>
            {option.name}
          </MenuItem>,
        )
      })
    })

    return optionElements
  }

  return (
    <FormControl sx={{ minWidth }} error={!!errorMessage}>
      <InputLabel>
        {label}
        {required && <StyledRequiredAsterisk> *</StyledRequiredAsterisk>}
      </InputLabel>
      <MuiSelect value={value} onChange={onChange} label={label}>
        {renderOptions()}
      </MuiSelect>
      {!!errorMessage && <FormHelperText>{label} is required</FormHelperText>}
    </FormControl>
  )
}

const StyledRequiredAsterisk = styled('span')`
  color: #d32f2f;
  font-size: 20px;
`

const StyledListSubheader = styled(ListSubheader)`
  background-color: #f6f6fa;
  color: black;
  font-weight: 600;
`
