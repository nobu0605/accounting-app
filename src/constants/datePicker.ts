export function errorColor(isError: boolean) {
  return {
    '& .MuiFormLabel-root': {
      color: isError ? '#d32f2f' : '',
    },
    '& .MuiFormHelperText-root': {
      color: isError ? '#d32f2f' : '',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: isError ? '#d32f2f' : '',
      },
    },
  }
}
