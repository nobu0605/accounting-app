import { Select as MuiSelect, MenuItem, FormControl, InputLabel } from '@mui/material'
import type { SelectProps } from '@mui/material'

type Props = {
  options: { id: number; name: string }[]
  label: string
  minWidth?: number
  onChange: SelectProps['onChange']
}

export function Select({ options, label, minWidth = 200, onChange }: Props) {
  return (
    <FormControl sx={{ minWidth }}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect onChange={onChange} label={label}>
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.id.toString()}>
            {option.name}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
