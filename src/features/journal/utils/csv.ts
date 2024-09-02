export function handleDownload(csvContent: string) {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'data.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
