import { Snackbar as MuiSnackbar } from '@mui/material'
import Alert from '@mui/material/Alert'

type Props = {
  isOpen: boolean
  message: string
  setIsOpen: (value: boolean) => void
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'center' | 'right'
  autoHideDuration?: number
  severity: 'error' | 'warning' | 'info' | 'success'
  variant: 'filled' | 'outlined' | 'standard'
}

export function Snackbar({
  isOpen,
  message,
  setIsOpen,
  vertical = 'top',
  horizontal = 'center',
  autoHideDuration,
  severity,
  variant,
}: Props) {
  return (
    <MuiSnackbar
      anchorOrigin={{ vertical, horizontal }}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      autoHideDuration={autoHideDuration}
      key={vertical + horizontal}
    >
      <Alert onClose={() => setIsOpen(false)} severity={severity} variant={variant}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
