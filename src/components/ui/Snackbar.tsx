import { Snackbar as MuiSnackbar } from '@mui/material'
import Alert from '@mui/material/Alert'

type Props = {
  isOpen: boolean
  message: string
  onClose: () => void
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'center' | 'right'
  autoHideDuration?: number
  severity: 'error' | 'warning' | 'info' | 'success'
  variant: 'filled' | 'outlined' | 'standard'
}

export function Snackbar({
  isOpen,
  message,
  onClose,
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
      onClose={onClose}
      autoHideDuration={autoHideDuration}
      key={vertical + horizontal}
    >
      <Alert onClose={onClose} severity={severity} variant={variant}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
